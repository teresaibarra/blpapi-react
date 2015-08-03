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

function submitQuery(data) {
	var query = data[0];
	var url = data[1];
	var type = data[2];

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
		AppStore.emitChange();
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

function handleError(url, err) {
	_postBody = "";
	_receivedData = "";
	_error = ["Missing URL.", "undefined"];
	AppStore.emitChange();
}

var AppStore = assign({}, EventEmitter.prototype, {
	getAll: function() {
		return [_receivedData, _postBody, _requestType, _error, _url];
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

		default:
		return true;
	}
});

module.exports = AppStore;
