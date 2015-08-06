var React = require('react');
var HistoryEvent = require('./HistoryEvent.react');

var History = React.createClass({
	getInitialState: function(){
		return{
			historyDisplay: {display:'none'}
		};
	},
	toggleHistory: function() {
		if(this.state.historyDisplay.display === 'none'){
			this.setState({historyDisplay: {display:'block'}});
		}else{
			this.setState({historyDisplay: {display:'none'}});
		}
	},
	render: function(){
		var response = this.props.response;
		var button;
		var events = [];
		if(response[0]){
			button = <a className="tab" onClick={this.toggleHistory}>History</a>;
			response.forEach(function (res, index){
				events.push(<HistoryEvent response={res} key={res[1].toUTCString()} />)
			})			
		}
		return(
			<div>
				{button}
				<p style={this.state.historyDisplay}>{events}</p>
			</div>
		);
	}
});

module.exports = History;