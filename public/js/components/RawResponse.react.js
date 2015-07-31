var React = require('react');

var RawResponse = React.createClass({
	render: function(){
		var title = "";
		var data = "";
		
		if (this.props.data)
		{
			title = "Raw Response";
			data = JSON.stringify(this.props.data, null, 3);
		}
		return(
			<div className="rawResponse" id="rawResponse">
				<h2 id="dataTitle">{title}</h2>
				<div id ="rawResponseInfo">
					<pre className="rawResponseInfo">{data}</pre>
				</div>
			</div>
		);
	}
});

module.exports = RawResponse;