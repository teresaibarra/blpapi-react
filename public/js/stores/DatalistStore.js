var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


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
		case AppConstants.UPDATE_DATALIST:
			var data = payload.action.item;
			break;

		default:
		return true;
	}
});

module.exports = DatalistStore;