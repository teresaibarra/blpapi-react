var React = require('react');

var Text = React.createClass({
	render: function(){
		var response = this.props.response;
		var responseNodes;

		if(response) {
			var secData = response.data[0].securityData;
			responseNodes = secData.map(function (sec) {
				var info = [];
				info.push(<h3 id="security" key={sec.security} > {"SECURITY: " + sec.security.toUpperCase()} </h3>);
				
				for (var j in sec.fieldData){
					var value = j;
					if (value.indexOf("_") != -1){
						value = value.replace(/_/g, " ");
					}
					info.push(<h4 id="fieldData" key={value.trim()}> {value.trim().toUpperCase() + ": " + sec.fieldData[j]} </h4>)
				}

				return(
					{info}
				);
			});
		}
		
		return(
			<div>
				<p className="data">
					{responseNodes}
				</p>
			</div>
		);
	}
});

module.exports = Text;