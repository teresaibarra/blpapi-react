var React = require('react');
var AppActions = require('../actions/AppActions');

var HistoryEvent = React.createClass({
	handleClick: function() {
		AppActions.revertToEvent(this.props.response[0]);
	},
	render: function(){
		var fields = this.props.response[0][0];
		var url = this.props.response[0][1];
		var service = this.props.response[0][2];
		var type = this.props.response[0][3];
		var date = this.props.response[1];
		return(
			<div onClick={this.handleClick}>
				<p id="historyLabel">Date: </p>{date.toUTCString()}
				<br />
				<p id="historyLabel">Service: </p>{service}
				<br />
				<p id="historyLabel">Request Type: </p>{type}
			</div>
		);
	}
});

module.exports = HistoryEvent;