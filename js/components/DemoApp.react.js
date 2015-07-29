/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var ResponseList = require('./ResponseList.react');
var QueryForm = require('./QueryForm.react');
var ErrorMessage = require('./ErrorMessage.react');

function getAppState() {
  return {
    allData: AppStore.getAll()
  };
}

var DemoApp = React.createClass({
    getInitialState: function() {
      return getAppState();
    },

    componentDidMount: function() {
      AppStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
      AppStore.removeChangeListener(this._onChange);
    },

    render: function(){
      return (
        <div>
          <h1>Bloomberg API Demonstration</h1>
          <h2>What would you like to look up?</h2>
          <h5>Pro-Tip: Separate multiple parameters with commas.</h5>
          <QueryForm />
          <ErrorMessage error={this.state.allData[3]} />
          <ResponseList data={this.state.allData} />
        </div>
      )
    },

    _onChange: function() {
      this.setState(getAppState());
    }
  });

module.exports = DemoApp;