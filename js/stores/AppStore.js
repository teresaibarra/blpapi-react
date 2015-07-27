var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _receivedData = "";
var _postBody = "";
var _requestType = "";

function submitReference(data){

    var service = data[0];
    var type = data[1];
    var securities = data[2];
    var fields = data[3];

    if(!service || !type || !securities || !fields)
    {
      return;
    }
    securities = securities.split(",");
    fields = fields.split(",");
    securities.forEach(function (sec) {
      sec = sec.trim();
    });
    fields.forEach(function (fld){
      fld = fld.trim();
    })
    _requestType = type;
    var url = 'http://localhost:3000/request?ns=blp' + '&service=' + service + '&type=' + type;
    handleQuerySubmit({securities: securities, fields: fields}, url);       
   
}

function submitHistorical(data){

    var service = data[0];
    var type = data[1];
    var securities = data[2];
    var fields = data[3];
    var startDate = data[4];
    var endDate = data[5];

    if(!service || !type || !securities || !fields || !startDate || !endDate)
    {
      return;
    }
    securities = securities.split(",");
    fields = fields.split(",");
    securities.forEach(function (sec) {
      sec = sec.trim();
    });
    fields.forEach(function (fld){
      fld = fld.trim();
    })


    _requestType = type;
    var url = 'http://localhost:3000/request?ns=blp' + '&service=' + service + '&type=' + type;
    handleQuerySubmit({securities: securities, fields: fields, startDate: startDate, endDate: endDate, "periodicitySelection": "MONTHLY"}, url);
    console.log({securities: securities, fields: fields, startDate: startDate, endDate: endDate, "periodicitySelection": "MONTHLY"}, url);       
   
}

function handleQuerySubmit(query, url) {
  $.ajax({
   url: url, //URL to hit
   type: 'POST', 
   data: JSON.stringify(query),
   success: function(data) {
    _postBody = query;
    _receivedData = data;   
    AppStore.emitChange();
    }.bind(this),
   error: function(xhr, status, err) {
     console.error(url, status, err.toString());
     AppStore.emitChange();
     }.bind(this)
   })

} 

var AppStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return [_receivedData, _postBody, _requestType];
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
    case AppConstants.SUBMIT_REFERENCE_QUERY:
      var data = payload.action.item;
      submitReference(data);
      console.log("reference called.")
      break;
    case AppConstants.SUBMIT_HISTORICAL_QUERY:
      var data = payload.action.item;
      submitHistorical(data);
      console.log("historical called.")
      break;


    default:
      return true;
  }

});

module.exports = AppStore;
