var React = require('react');

var PrettyResponse = React.createClass({
	render: function(){
		var title;
		var response;
		
		if (this.props.response)
		{
				title = "Pretty Response";
				response = JSON.stringify(this.props.response, null, 3);
		}
		
		return(
			<div className="prettyResponse" id="prettyResponse" >
				<h2 id="responseTitle">{title}</h2>
				<div id ="responseBodyInfo">
					<pre>{response}</pre>
				</div>
			</div>
		);
	}
});

module.exports = PrettyResponse;