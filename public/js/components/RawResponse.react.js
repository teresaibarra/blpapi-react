var React = require('react');

var RawResponse = React.createClass({
	render: function(){
		var title = "";
		var data = "";
		var formatted = this.props.formatted;
		
		if (this.props.data)
		{
				title = "Raw Response";
				data = JSON.stringify(this.props.data).replace(/(.{63})/g, "$1\n")
		}
		return(
			<div className="RawResponse" id="RawResponse" >
				<h2 id="dataTitle">{title}</h2>
				<div id ="responseBodyInfo">
					<pre>{data}</pre>
				</div>
			</div>
		);
	}
});

module.exports = RawResponse;