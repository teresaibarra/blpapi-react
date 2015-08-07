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

	_onChange: function() {
		var oldData = this.state.appData[6];
		this.setState(getAppState(), function(){	
			var newData = this.state.appData[6];
			if(!Object.is(JSON.stringify(oldData), JSON.stringify(newData))){
				if(JSON.stringify(newData) != "{}"){
					this.setState({appData: ["", "", "", "", "", this.state.appData[5], this.state.appData[6]]})
				}
				//forceUpdate() called due to component rendering before setState finishes.
				this.forceUpdate();
			}else if (Object.is(JSON.stringify(oldData), JSON.stringify(newData)) && JSON.stringify(oldData) !="{}"){
				this.setState({appData: ["", "", "", "", "", this.state.appData[5], this.state.appData[6]]})
				this.forceUpdate();				
			}		
		});
	},

	render: function(){
		return (
		<div>
				<h1>Bloomberg API Demonstration</h1>
				<h2>What would you like to look up?</h2>
				<h5>Pro-Tip: Separate multiple parameters with commas.</h5>
			<div>
				<QueryForm list={this.state.listData} event={this.state.appData[6]}/>
				<ErrorMessage error={this.state.appData[3]} />
				<ResponseList data={this.state.appData} />
			</div>
			<div id="historySection"><History response={this.state.appData[5]}/> 
			</div>
		</div>
		)
	}

});

module.exports = DemoApp;