var React = require('react');

var RawResponse = React.createClass({
	render: function(){
		var title;
		var response;
		
		if (this.props.response){
				title = "Raw Response";
				response = JSON.stringify(this.props.response).replace(/(.{63})/g, "$1\n")
		}
		
		return(
			<div className="RawResponse" id="RawResponse" >
				<h2 id="responseTitle">{title}</h2>
				<div id ="responseBodyInfo">
					<pre>{response}</pre>
				</div>
			</div>
		);
	}
});

module.exports = RawResponse;