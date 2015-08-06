var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
	submitQuery: function(item){
		AppDispatcher.handleViewAction({
			actionType:AppConstants.SUBMIT_QUERY,
			item: item
		})
	},
	handleError: function(item){
		AppDispatcher.handleViewAction({
			actionType:AppConstants.HANDLE_ERROR,
			item: item
		})
	},
	revertToEvent: function(item){
		AppDispatcher.handleViewAction({
			actionType:AppConstants.REVERT_TO_EVENT,
			item: item
		})		
	}
}

module.exports = AppActions;
