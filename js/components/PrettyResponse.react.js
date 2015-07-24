var React = require('react');

var PrettyResponse = React.createClass({
	render: function(){

		var data = this.props.data;
		var responseNodes;
		var dataTitle;

		if(data) {
			dataTitle = <h2 id="dataTitle"> Pretty Response: </h2>
			var secData = data.data[0].securityData;
			console.log(secData);
			responseNodes = secData.map(function (sec) {
				var info = [];
				info.push(<h3 id="security"> {"SECURITY: " + sec.security.toUpperCase()} </h3>);
				for (var j in sec.fieldData)
				{
					var value = j;
					if (value.indexOf("_") != -1)
					{
						value = value.replace(/_/g, " ");
					}
					info.push(<h4 id="fieldData"> {value.trim().charAt(0).toUpperCase() + 
						value.trim().slice(1).toLowerCase() + ": " + sec.fieldData[j]} </h4>)
				}
				return(
					{info}
				);
			});
		}
		return(
			<p className="data" id="prettyResponse">
				{dataTitle}
				{responseNodes}
			</p>
			
		);
	}
});

module.exports = PrettyResponse;