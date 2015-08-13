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
		var history = this.props.history;
		var button;
		var events = [];

		if(history[0]){
			button = <a id="blueButton" onClick={this.toggleHistory}>History</a>;
			history.forEach(function (event, index){
				events.push(<HistoryEvent event={event} key={event.date.toUTCString() + index} />)
				if(index != history.length - 1){
					events.push(<hr key={index} />)
				}
			})			
		}
		
		return(
			<div>
				{button}
				<div style={this.state.historyDisplay} id="history">{events}</div>
			</div>
		);
	}
});

module.exports = History;