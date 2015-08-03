var React = require('react');
var ResponseData = require('./ResponseData.react');
var RawResponse = require('./RawResponse.react');
var PrettyResponse = require('./PrettyResponse.react');
var PostBody = require('./PostBody.react');

var ResponseList = React.createClass({
	getInitialState: function() {
		return { formatted: true};
	},
	togglePostBody: function(){
		$('#postBody').show();
		$('#RawResponse').hide();
		$('#PrettyResponse').hide();
		$('#responseData').hide();
		$("#postBody")
			.css('opacity', 0)
			.fadeTo("fast", 1);	
	},
	toggleRawResponse: function(){
		formatted = false;
		$('#postBody').hide();
		$('#RawResponse').show();
		$('#PrettyResponse').hide();
		$('#responseData').hide();
		$("#RawResponse")
			.css('opacity', 0)
			.fadeTo("fast", 1);	
	},
	togglePrettyResponse: function(){
		formatted = true;
		$('#postBody').hide();
		$('#RawResponse').hide();
		$('#PrettyResponse').show();
		$('#responseData').hide();
		$("#PrettyResponse")
			.css('opacity', 0)
			.fadeTo("fast", 1);	
	},
	toggleResponseData: function(){
		$('#postBody').hide();
		$('#RawResponse').hide();
		$('#PrettyResponse').hide();
		$('#responseData').show();
		$("#responseData")
			.css('opacity', 0)
			.fadeTo("fast", 1);	
	},
	render: function(){
		var data = this.props.data[0];
		var request = this.props.data[1];
		var type = this.props.data[2];
		var error = this.props.data[3];
		var url = this.props.data[4];
		var buttons = [];

		if (error) {
			$('#postBody').hide();
			$('#RawResponse').hide();
			$('#PrettyResponse').hide();
			$('#responseData').hide();
			$("#responseList").hide();
			buttons = [];
		}else {
			$("#responseList").show();
			$('#postBody').hide();
			$('#RawResponse').hide();
			$('#PrettyResponse').hide();
			$('#responseData').show();
			$("#responseData")
				.css('opacity', 0)
				.fadeTo("fast", 1);	
			if(data){
				buttons.push(
					<div id="buttons" key="buttons" >				
					<a className="tab" onClick={this.togglePostBody}>POST Request</a>
					<a className="tab" onClick={this.toggleRawResponse}>Raw Response</a>
					<a className="tab" onClick={this.togglePrettyResponse}>Pretty Response</a>
					<a className="tab" onClick={this.toggleResponseData}>Response Data</a>
					</div>);
			}
		}
		return (
			<div>
				{buttons}
			<div className="responseList" id="responseList">
				<div id="postBody"><PostBody request={request} url ={url} /></div>
				<div id="RawResponse"><RawResponse data={data} /></div>
				<div id="PrettyResponse"><PrettyResponse data={data} /></div>
				<div id="responseData"><ResponseData data={data} type={type} /></div>
			</div>
			</div>
		)
	}
});

module.exports = ResponseList;