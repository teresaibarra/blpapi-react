/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var DatalistStore = require('../stores/DatalistStore');

var ResponseList = require('./ResponseList.react');
var QueryForm = require('./QueryForm.react');
var ErrorMessage = require('./ErrorMessage.react');
var History = require('./History.react');

function getAppState() {
	return {
		appData: AppStore.getAll()
	};
}

var DemoApp = React.createClass({
	getInitialState: function() {
		return {
			appData: AppStore.getAll(),
			listData: DatalistStore.getAll()
		};
	},

	componentDidMount: function() {
		AppStore.addChangeListener(this._onChange);
		DatalistStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		AppStore.removeChangeListener(this._onChange);
		DatalistStore.addChangeListener(this._onChange);
	},

	render: function(){
		return (
		<div>
				<h1>Bloomberg API Demonstration</h1>
				<h2>What would you like to look up?</h2>
				<h5>Pro-Tip: Separate multiple parameters with commas.</h5>
			<div>
				<QueryForm event={this.state.appData.event} list={this.state.listData} />
				<ErrorMessage error={this.state.appData.error} />
				<ResponseList data={this.state.appData} />
			</div>
			<div id="historySection">
				<History history={this.state.appData.history}/> 
			</div>
		</div>
		)
	},

	_onChange: function() {
		this.setState(getAppState());
	}
});

module.exports = DemoApp;