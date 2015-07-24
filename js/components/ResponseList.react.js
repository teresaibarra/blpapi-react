var React = require('react');
var PrettyResponse = require('./PrettyResponse.react');
var RawResponse = require('./RawResponse.react');
var Chart = require('./Chart.react');
var PostBody = require('./PostBody.react');

var ResponseList = React.createClass({
	render: function(){
		var data = this.props.data[0];
		var request = this.props.data[1];
		return (
			<div className="responseList">
				<PostBody request={request} />
				<RawResponse data={data} />

			
			</div>
		)
	}
});

module.exports = ResponseList;