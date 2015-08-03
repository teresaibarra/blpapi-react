var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
	submitQuery: function(item){
		AppDispatcher.handleViewAction({
			actionType:AppConstants.SUBMIT_QUERY,
			item: item
		})
	},
	submitReferenceQuery: function(item){
		AppDispatcher.handleViewAction({
			actionType:AppConstants.SUBMIT_REFERENCE_QUERY,
			item: item
		})
	},
	submitHistoricalQuery: function(item){
		AppDispatcher.handleViewAction({
			actionType:AppConstants.SUBMIT_HISTORICAL_QUERY,
			item: item
		})
	},
	submitTextAreaQuery: function(item){
		AppDispatcher.handleViewAction({
			actionType:AppConstants.SUBMIT_TEXT_AREA_QUERY,
			item: item
		})
	},
	updateDatalist: function(item){
		AppDispatcher.handleViewAction({
			actionType:AppConstants.UPDATE_DATALIST,
			item: item
		})		
	}

}

module.exports = AppActions;
