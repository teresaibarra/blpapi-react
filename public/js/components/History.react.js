var React = require('react');
var HistoryEvent = require('./HistoryEvent.react');

var History = React.createClass({
	render: function(){
		var response = this.props.response;
		var events = [];

		response.forEach(function (res, index){
			events.push(<HistoryEvent response={res} key={res[1].toUTCString()} />)
		})
		return(
			<div>
				<p>
					{events}
				</p>
			</div>
		);
	}
});

module.exports = History;