var React = require('react');
var Text = require('./Text.react');
var Chart = require('./Chart.react');

var ResponseData = React.createClass({
	render: function(){
		var response = this.props.response;
		var requestType = this.props.requestType;
		var dataTitle;
		var visualType;
		var organizedData = [];
		var dateList = [];
		var securityCount = 0;

		if(response) {
			dataTitle = <h2 id="responseTitle">Response Data</h2>;
			if (requestType === 'HistoricalDataRequest') {
				var responseNodes;
				var secData = response.data;
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
									if (!organizedData[key])
									{
										organizedData[key] = [];
										organizedData[key].push([secName, result[key]]);
									}else 
									{
										organizedData[key].push([])
										organizedData[key].push([secName, result[key]]);
									}
								}
							}
						}
					}
					securityCount++;
				});

				dateList = dateList.slice(0,(dateList.length)/securityCount);

				for(var array in organizedData) {
					for (var data in organizedData[array]) {
						if (organizedData[array][data].length == 0) {
							organizedData[array].splice(data, 1);
						}
					}
				}

				for (var array in organizedData)
				{
					chartData.push(<h3 key={array.trim() + 1}>{array.trim().toUpperCase()}</h3>);
					chartData.push(<Chart data={organizedData[array]} dateList={dateList} dataName={array.trim()} key={array.trim() + 2} />)
				}

				visualType = chartData;
			} else {
				visualType = <Text response={response} />
			}
		}
		
		return(
			<p className="data" id="responseData" >
				{dataTitle}
				{visualType}
			</p>
		);
	}
});

module.exports = ResponseData;