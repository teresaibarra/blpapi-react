var React = require('react');
var LineChart = require("react-chartjs").Line;
	

var Chart = React.createClass({
	render: function(){
		var data = this.props.data;
		var dateList = this.props.dateList;
		var dataName = this.props.dateName;
		var formattedDateList = [];
		var info = [];
		var responseNodes;


		if(data) {
			for (var array in data) {
				var red = Math.floor(Math.random() * 255);
				var green = Math.floor(Math.random() * 255);
				var blue = Math.floor(Math.random() * 255);

				info.push({
					label: data[array][0],
					fillColor: "rgba(" + red + "," + green + "," + blue + "," + 0.2 + ")" ,
					strokeColor: "rgba(" + red + "," + green + "," + blue + "," + 1 + ")" ,
					pointColor: "rgba(" + red + "," + green + "," + blue + "," + 1 + ")" ,
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(" + red + "," + green + "," + blue + "," + 1 + ")" ,
					data: data[array][1]
				});
			}

			for (date in dateList) {
				var rawMonth = dateList[date].getMonth() + 1;
				var formattedMonth;

				if (rawMonth == 1){
					formattedMonth = "Jan";
				}else if (rawMonth == 2){
					formattedMonth = "Feb";
				}else if (rawMonth == 3){
					formattedMonth = "Mar";					
				}else if (rawMonth == 4){
					formattedMonth = "Apr";					
				}else if (rawMonth == 5){
					formattedMonth = "May";					
				}else if (rawMonth == 6){
					formattedMonth = "Jun";					
				}else if (rawMonth == 7){
					formattedMonth = "Jul";					
				}else if (rawMonth == 8){
					formattedMonth = "Aug";					
				}else if (rawMonth == 9){
					formattedMonth = "Sept";					
				}else if (rawMonth == 10){
					formattedMonth = "Oct";					
				}else if (rawMonth == 11){
					formattedMonth = "Nov";					
				}else if (rawMonth == 12){
					formattedMonth = "Dec";					
				}else {
					return;
				}
				var temp = formattedMonth + " " + dateList[date].getDate() + ",'" + dateList[date].getFullYear().toString().substring(2);
				formattedDateList.push(temp);
			}
		}

		var chartData = {
			labels: formattedDateList,
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
		    pointDotRadius : 5,

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
					<LineChart data={chartData} options={chartOptions} key={dataName} width="800" height="400" redraw/>
				</p>
			</div>
		);
	}
});

module.exports = Chart;