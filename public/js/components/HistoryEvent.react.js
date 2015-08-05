var React = require('react');

var HistoryEvent = React.createClass({
	handleClick: function() {
		console.log(this.props.response[1].getUTCMinutes());
	},
	render: function(){
		var fields = this.props.response[0][0];
		var url = this.props.response[0][1];
		var service = this.props.response[0][2];
		var type = this.props.response[0][3];
		var date = this.props.response[1];
		return(
			<div onClick={this.handleClick}>
				<p>Date: {date.toUTCString()}
				<br />
				Service: {service}
				<br />
				Request Type: {type}</p>
			</div>
		);
	}
});

module.exports = HistoryEvent;