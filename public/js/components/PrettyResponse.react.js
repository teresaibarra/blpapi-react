var React = require('react');

var PrettyResponse = React.createClass({
	render: function(){
		var title = "";
		var data = "";
		var formatted = this.props.formatted;
		
		if (this.props.data)
		{
				title = "Pretty Response";
				data = JSON.stringify(this.props.data, null, 3);
		}
		return(
			<div className="prettyResponse" id="prettyResponse" >
				<h2 id="dataTitle">{title}</h2>
				<div id ="responseBodyInfo">
					<pre>{data}</pre>
				</div>
			</div>
		);
	}
});

module.exports = PrettyResponse;