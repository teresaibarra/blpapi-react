var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {

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
  }
}

module.exports = AppActions;
