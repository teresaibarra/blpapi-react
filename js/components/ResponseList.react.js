var React = require('react');
var PrettyResponse = require('./PrettyResponse.react');
var RawResponse = require('./RawResponse.react');
var PostBody = require('./PostBody.react');

var ResponseList = React.createClass({
	render: function(){
		var data = this.props.data[0];
		var request = this.props.data[1];
		var type = this.props.data[2];
		$("#responseList")
		  .animate(
		    { opacity: 0 },
		    { queue: true, duration: 200 }
		  )
		  .animate(
		    { opacity: 1 },
		    { queue: false, duration: 200 }
		);
		console.log("Rendered.")
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