var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _response = "";
var _postBody = "";
var _requestType = "";
var _error = "";
var _url = "";
var _history = [];
var _event = [{}];

function submitQuery(request) {
	var query = request[0];
	var url = request[1];
	var service = request[2];
	var type = request[3];

	$.ajax({
	url: url,
	type: 'POST', 
	data: JSON.stringify(query),
	success: function(response) {
		_postBody = query;
		_response = response;   
		_error = "";
		_url = url;
		_requestType = type;
		_event = [{}];
		updateHistory(request, response);
	},
	error: function(xhr, status, err) {
		_postBody = "";
		_response = "";
		_error = [err + ". (Status Code: " + xhr.status + ")", url];
		_url = ""
		_requestType = type;
	}
	})
} 

function handleError(data) {
	var field = data[0];
	var url = data[1];

	_postBody = "";
	_response = "";
	_error = [field, url];
}

function updateHistory(request, response) {
	var date = new Date();
	_history.unshift([request, date, response]);
	AppStore.emitChange();
}

function revertToEvent(request, response) {
	var query = request[0];
	var url = request[1];
	var service = request[2];
	var type = request[3];
	
	_event = [request, response, query, type, "", url];
	AppStore.emitChange();
}

var AppStore = assign({}, EventEmitter.prototype, {
	getAll: function() {
		return [_response, _postBody, _requestType, _error, _url, _history, _event];
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

AppDispatcher.register(function(payload){
	var action = payload.action;

	switch(action.actionType) {
		case AppConstants.SUBMIT_QUERY:
			var request = payload.action.item;
			submitQuery(request);
			break;

		case AppConstants.HANDLE_ERROR:
			var data = payload.action.item;
			handleError(data);
			break;

		case AppConstants.REVERT_TO_EVENT:
			var request = payload.action.item[0];
			var response = payload.action.item[1];
			revertToEvent(request, response);
			break;

		default:
		return true;
	}

	return true;
});

module.exports = AppStore;