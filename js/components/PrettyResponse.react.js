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
				responseType = <Chart data={data} />;
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