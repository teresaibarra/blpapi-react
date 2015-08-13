var React = require('react');
var AppActions = require('../actions/AppActions');

var HistoryEvent = React.createClass({
	handleClick: function() {
		AppActions.revertToEvent({
			request: this.props.event.request, 
			response: this.props.event.response
			}
		);
	},
	
	render: function(){
		var service = this.props.event.request.service;
		var requestType = this.props.event.request.requestType;
		var date = this.props.event.date;

		return(
			<div onClick={this.handleClick}>
				<p id="historyLabel">Date: </p>{date.toUTCString()}
				<br />
				<p id="historyLabel">Service: </p>{service}
				<br />
				<p id="historyLabel">Request Type: </p>{requestType}
			</div>
		);
	}
});

module.exports = HistoryEvent;