var React = require('react');
var PrettyResponse = require('./PrettyResponse.react');
var RawResponse = require('./RawResponse.react');
var PostBody = require('./PostBody.react');

var ResponseList = React.createClass({
	render: function(){
		var data = this.props.data[0];
		var request = this.props.data[1];
		var type = this.props.data[2];
		var error = this.props.data[3];

		
		if (!error) {
			$("#responseList")
				.css('opacity', 0)
				.fadeTo("fast", 1);			
		}else {
			$("#responseList")
				.fadeTo("fast", 0);	
		}


		return (
			<div className="responseList" id="responseList" >
				<PostBody request={request} />
				<RawResponse data={data} />
				<PrettyResponse data={data} type={type} />
			</div>
		)
	}
});

module.exports = ResponseList;