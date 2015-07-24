var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {

  submitQuery: function(item){
    AppDispatcher.handleViewAction({
      actionType:AppConstants.SUBMIT_QUERY,
      item: item
    })
  }
}

module.exports = AppActions;
