var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _response;
var _postBody;
var _requestType;
var _error;
var _url;
var _history = [];
var _event;

function submitQuery(request) {
	var postBody = request.postBody;
	var url = request.url;
	var service = request.service;
	var requestType = request.requestType;

	$.ajax({
		url: url,
		type: 'POST', 
		data: JSON.stringify(postBody),
		success: function(response) {
			_postBody = postBody;
			_response = response;   
			_error = null;
			_url = url;
			_requestType = requestType;
			_event = null;
			updateHistory(request, response);
		},
		error: function(xhr, status, err) {
			_postBody = null;
			_response = null;
			_error = {type: err + " (Status Code: " + xhr.status + ")"};
			_url = null;
			_requestType = requestType;
			AppStore.emitChange();
		}
	})
} 

function handleError(error) {
	var type = error.type;
	var url = error.url;

	_postBody = null;
	_response = null;
	_error = {type: type};
	_event = null;
	AppStore.emitChange();
}

function updateHistory(request, response) {
	var date = new Date();
	_history.unshift({
		request: request, 
		date: date, 
		response: response
		}
	);
	AppStore.emitChange();
}

function revertToEvent(request, response) {
	var postBody = request.postBody;
	var url = request.url;
	var service = request.service;
	var requestType = request.requestType;
	
	_event = {
		request: request,
		response: response, 
		postBody: postBody,
		requestType: requestType, 
		error: null,
		url: url,
		service: service
	};
	_error = null;

	AppStore.emitChange();
}

var AppStore = assign({}, EventEmitter.prototype, {
	getAll: function() {
		return {
			response: _response, 
			postBody: _postBody,
			requestType: _requestType, 
			error: _error, 
			url: _url, 
			history: _history, 
			event: _event
		};
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
			var error = payload.action.item;
			handleError(error);
			break;

		case AppConstants.REVERT_TO_EVENT:
			var request = payload.action.item.request;
			var response = payload.action.item.response;
			revertToEvent(request, response);
			break;

		default:
		return true;
	}
	return true;
});

module.exports = AppStore;