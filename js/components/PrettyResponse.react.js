var React = require('react');
var PrettyText = require('./PrettyText.react');
var Chart = require('./Chart.react');

var PrettyResponse = React.createClass({
	render: function(){

		var data = this.props.data;
		var type = this.props.type;
		var dataTitle;
		var responseType;
		var matchedData = [];
		var dateList = [];

		if(data) {
			dataTitle = <h2 id="dataTitle"> Pretty Response: </h2>;
			if (type === 'HistoricalDataRequest') {

				var responseNodes;
				var secData = data.data;
				var info = [];
				var chartData = [];
				var keyList = [];

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
										if ($.inArray(key, keyList) == -1 && key != "date")
										{
											keyList.push(key);
										}
									}
									else 
									{
										result[key].push(secObject.fieldData[object][key]);
									}
							}
						}

					}

					for (date in result.date){
						var dt = new Date(result.date[date]);
						dateList.push(dt);
					}
					
					for (var key in result){
						if(result.hasOwnProperty(key) && key != "date") {
							for (var keyName in keyList){
								if (key === keyList[keyName] && result[key].length != 0){
									if (!matchedData[key])
									{
										matchedData[key] = [];
										matchedData[key].push([secName, result[key]]);
									}else 
									{
										matchedData[key].push([])
										matchedData[key].push([secName, result[key]]);
									}
								}

							}
						}
					}

				});
				
				dateList = dateList.slice(0,12);


				for(var array in matchedData) {
					for (var data in matchedData[array]) {
						if (matchedData[array][data].length == 0) {
							matchedData[array].splice(data, 1);
						}
					}
				}

				for (var array in matchedData)
				{
					chartData.push(<h3>{array.trim().toUpperCase()}</h3>);
					chartData.push(<Chart data={matchedData[array]} dateList={dateList} />)
				}
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