var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppActions = require('../actions/AppActions');

var CHANGE_EVENT = 'change';
var _data = "";

function getDatalist(){
	$.ajax({
	    type: 'GET',
	    url: '/services',
	    dataType: 'json',
	    success: function (data) {
	        _data = data;
	    }.bind(this),
		error: function(xhr, status, err) {
			AppActions.handleError(["Datalist not loaded. Please refresh the page.", "undefined"]);
		}.bind(this),
	    async: false
	});
}

var DatalistStore = assign({}, EventEmitter.prototype, {
	getAll: function() {
		getDatalist();
		return _data;
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
		default:
		return true;
	}
});

module.exports = DatalistStore;