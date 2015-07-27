var React = require('react');
var LineChart = require("react-chartjs").Line;
	

var Chart = React.createClass({
	render: function(){
		var data = this.props.data;
		var responseNodes;
		var keyName;
		if(data) {
			var secData = data.data;
			console.log(secData)
			var info = [];
			responseNodes = secData.map(function (sec) {
				var secObject = sec.securityData;
				var red = Math.floor(Math.random() * 255);
				var green = Math.floor(Math.random() * 255);
				var blue = Math.floor(Math.random() * 255);
				var dataArray = [];
				for (var j in secObject.fieldData){
					for (var key in secObject.fieldData[j]){
						if(secObject.fieldData[j].hasOwnProperty(key)){
							if (key !== "date"){
								keyName = key;
								if (keyName.indexOf("_") != -1) {
									keyName = keyName.replace(/_/g, " ");
								}
								keyName = <h3>{keyName.trim().toUpperCase()}</h3>;
								dataArray.push(secObject.fieldData[j][key]);
							}
						}
					}
				}	

				info.push({
					label: secObject.security.toUpperCase(),
					fillColor: "rgba(" + red + "," + green + "," + blue + "," + 0.2 + ")" ,
					strokeColor: "rgba(" + red + "," + green + "," + blue + "," + 1 + ")" ,
					pointColor: "rgba(" + red + "," + green + "," + blue + "," + 1 + ")" ,
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(" + red + "," + green + "," + blue + "," + 1 + ")" ,
					data: dataArray
				});
				return;
			});

		}

		var chartData = {
		labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	    datasets: info
		}

		var chartOptions = {
	    ///Boolean - Whether grid lines are shown across the chart
	    scaleShowGridLines : true,

	    //String - Colour of the grid lines
	    scaleGridLineColor : "rgba(0,0,0,.05)",

	    //Number - Width of the grid lines
	    scaleGridLineWidth : 1,

	    //Boolean - Whether to show horizontal lines (except X axis)
	    scaleShowHorizontalLines: true,

	    //Boolean - Whether to show vertical lines (except Y axis)
	    scaleShowVerticalLines: true,

	    //Boolean - Whether the line is curved between points
	    bezierCurve : true,

	    //Number - Tension of the bezier curve between points
	    bezierCurveTension : 0.4,

	    //Boolean - Whether to show a dot for each point
	    pointDot : true,

	    //Number - Radius of each point dot in pixels
	    pointDotRadius : 4,

	    //Number - Pixel width of point dot stroke
	    pointDotStrokeWidth : 1,

	    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
	    pointHitDetectionRadius : 20,

	    //Boolean - Whether to show a stroke for datasets
	    datasetStroke : true,

	    //Number - Pixel width of dataset stroke
	    datasetStrokeWidth : 2,

	    //Boolean - Whether to fill the dataset with a colour
	    datasetFill : true,

	    //String - A legend template
	    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
			
	    multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>"
		}


		
		return(
			<div>
				<p className="data" id="lineChart">
					{keyName}
					<LineChart data={chartData} options={chartOptions} width="600" height="250"/>
					
				</p>
			</div>
		);
	}
});

module.exports = Chart;