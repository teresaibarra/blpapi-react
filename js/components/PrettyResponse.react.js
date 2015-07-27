var React = require('react');
var PrettyText = require('./PrettyText.react');
var Chart = require('./Chart.react');

var PrettyResponse = React.createClass({
	render: function(){

		var data = this.props.data;
		var type = this.props.type;
		var dataTitle;
		var responseType;


		if(data) {
			dataTitle = <h2 id="dataTitle"> Pretty Response: </h2>;
			if (type === 'HistoricalDataRequest') {

			var responseNodes;
			var secData = data.data;
			var info = [];
			var chartData = [];

			responseNodes = secData.map(function (sec) {
				var secObject = sec.securityData;
				var result = {};
				var secName = secObject.security.toUpperCase();

				for (var object in secObject.fieldData){
					for (var key in secObject.fieldData[object]){
						if(secObject.fieldData[object].hasOwnProperty(key)){
								if(!result[key])
								{
									result[key] = [];
									result[key].push(secObject.fieldData[object][key]);
								}
								else 
								{
									result[key].push(secObject.fieldData[object][key]);
								}
						}
					}

				}

				for (var key in result){
					if(result.hasOwnProperty(key) && key != "date") {
						console.log(result[key])
						chartData.push(<h3>{key.trim().toUpperCase()}</h3>)
						chartData.push(<Chart data={result[key]} secName={secName} />)
					}
				}

			});
		
				responseType = chartData;

			} else {
				responseType = <PrettyText data={data} />
			}
		}

		return(
			<p className="data" id="prettyResponse">
				{dataTitle}
				{responseType}
			</p>
			
		);
	}
});

module.exports = PrettyResponse;