var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _receivedData = "";
var _postBody = "";
var _requestType = "";
var _error = "";
var _url = "";
var _history = [];
var _event = {};

function submitQuery(data) {
	var query = data[0];
	var url = data[1];
	var service = data[2];
	var type = data[3];

	$.ajax({
	url: url,
	type: 'POST', 
	data: JSON.stringify(query),
	success: function(receivedData) {
		_postBody = query;
		_receivedData = receivedData;   
		_error = "";
		_url = url;
		_requestType = type;
		_event = {};
		updateHistory(data);
	}.bind(this),
	error: function(xhr, status, err) {
		_postBody = "";
		_receivedData = "";
		_error = [err + ".", url];
		_url = ""
		_requestType = type;
		AppStore.emitChange();
	}.bind(this)
	})
} 

function handleError(data) {
	var field = data[0];
	var url = data[1];

	_postBody = "";
	_receivedData = "";
	_error = [field, url];
	AppStore.emitChange();
}

function updateHistory(request) {
	var date = new Date();
	_history.unshift([request, date]);
	AppStore.emitChange();
}

function revertToEvent(event, callback) {
	_event = event;
	AppStore.emitChange();
}

var AppStore = assign({}, EventEmitter.prototype, {
	getAll: function() {
		return [_receivedData, _postBody, _requestType, _error, _url, _history, _event];
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
			var data = payload.action.item;
			submitQuery(data);
			break;

		case AppConstants.HANDLE_ERROR:
			var data = payload.action.item;
			handleError(data);
			break;

		case AppConstants.REVERT_TO_EVENT:
			var event = payload.action.item;
			revertToEvent(event);
			break;

		default:
		return true;
	}
});

module.exports = AppStore;
