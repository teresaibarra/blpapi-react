var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _receivedData = "";
var _postBody = "";
var _requestType = "";
var _error = "";

function submitReference(data){
  var service = data[0];
  var type = data[1];
  var securities = data[2];
  var fields = data[3];
  var cleanSecurities = [];
  var cleanFields = [];

  var url = 'http://localhost:3000/request?ns=blp' + '&service=' + service + '&type=' + type;

	if(!service){
		_postBody = "";
		_receivedData = "";
		_error = ["Missing URL.", "undefined"];
		AppStore.emitChange();
	}else if (!type){
		_postBody = "";
		_receivedData = "";
		_error = ["Missing request type.", "undefined"];
		AppStore.emitChange();
	}else if (!securities){
	_postBody = "";
	_receivedData = "";
	_error = ["Missing securities.", url];
	AppStore.emitChange();
	}else if (!fields){
	_postBody = "";
	_receivedData = "";
	_error = ["Missing fields.", url];
	AppStore.emitChange();
	}
	else {
	  securities = securities.split(",");
	  fields = fields.split(",");

	  securities.forEach(function (sec) {
	    sec = sec.trim();
	    cleanSecurities.push(sec);
	  });
	  fields.forEach(function (fld){
	    fld = fld.trim();
	    cleanFields.push(fld);
	  })

	  _requestType = type;

	  handleQuerySubmit({securities: cleanSecurities, fields: cleanFields}, url);  
	}
}

function submitHistorical(data){
  var service = data[0];
  var type = data[1];
  var securities = data[2];
  var fields = data[3];
  var startDate = data[4];
  var endDate = data[5];
  var period = data[6];
  var cleanSecurities = [];
  var cleanFields = [];

  var url = 'http://localhost:3000/request?ns=blp' + '&service=' + service + '&type=' + type;

	if(!service){
		_postBody = "";
		_receivedData = "";
		_error = ["Missing URL.", "undefined"];
		AppStore.emitChange();
	}else if (!type){
		_postBody = "";
		_receivedData = "";
		_error = ["Missing request type.", "undefined"];
		AppStore.emitChange();
	}else if (!securities){
	_postBody = "";
	_receivedData = "";
	_error = ["Missing securities.", url];
	AppStore.emitChange();
	}else if (!fields){
	_postBody = "";
	_receivedData = "";
	_error = ["Missing fields.", url];
	AppStore.emitChange();
	}else if (!startDate){
	_postBody = "";
	_receivedData = "";
	_error = ["Missing start date.", url];
	AppStore.emitChange();
	}else if (!endDate){
	_postBody = "";
	_receivedData = "";
	_error = ["Missing end date.", url];
	AppStore.emitChange();
	}else if (!period){
	_postBody = "";
	_receivedData = "";
	_error = ["Missing periodicity selection.", url];
	AppStore.emitChange();
	}
	else {
	  securities = securities.split(",");
	  fields = fields.split(",");

	  securities.forEach(function (sec) {
	    sec = sec.trim();
	    cleanSecurities.push(sec);
	  });
	  fields.forEach(function (fld){
	    fld = fld.trim();
	    cleanFields.push(fld);
	  })

	  _requestType = type;

	  handleQuerySubmit({securities: cleanSecurities, fields: cleanFields, startDate: startDate, endDate: endDate, 
	    "periodicitySelection": period}, url);
	}
}

function submitTextArea(data){

    var url = data[0];
    var body = JSON.parse(data[1]);

    if(!url){
	 _postBody = "";
	 _receivedData = "";
	 _error = ["Missing URL.", "undefined"];
	 AppStore.emitChange();
    }else if (!body){
     _postBody = "";
     _receivedData = "";
     _error = ["Missing POST Body.", url];
     AppStore.emitChange();
    }else {
	    var index = url.indexOf("type=") + 5;
	    _requestType = url.substring(index);

	    handleQuerySubmit(body, url);
    }
}

function handleQuerySubmit(query, url) {
  $.ajax({
   url: url,
   type: 'POST', 
   data: JSON.stringify(query),
   success: function(data) {
    _postBody = query;
    _receivedData = data;   
    _error = "";
    AppStore.emitChange();
    }.bind(this),
   error: function(xhr, status, err) {
     _postBody = "";
     _receivedData = "";
     _error = [err + ".", url];
     AppStore.emitChange();
     }.bind(this)
   })
} 

var AppStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return [_receivedData, _postBody, _requestType, _error];
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
      break;

    case AppConstants.SUBMIT_HISTORICAL_QUERY:
      var data = payload.action.item;
      submitHistorical(data);
      break;

    case AppConstants.SUBMIT_TEXT_AREA_QUERY:
      var data = payload.action.item;
      submitTextArea(data);
      break;

    default:
      return true;
  }
});

module.exports = AppStore;
