var React = require('react');
var ResponseData = require('./ResponseData.react');
var RawResponse = require('./RawResponse.react');
var PrettyResponse = require('./PrettyResponse.react');
var PostBody = require('./PostBody.react');

var ResponseList = React.createClass({
	getInitialState: function() {
		return {
			postDisplay: {display:'none'},
			rawResponseDisplay: {display:'none'},
			prettyResponseDisplay: {display:'none'},
			selection: "responseData"
		};
	},

	componentWillReceiveProps: function(nextProps){
		this.setState({postDisplay: {display:'none'}});
		this.setState({rawResponseDisplay: {display:'none'}});
		this.setState({prettyResponseDisplay: {display:'none'}});
		this.setState({selection: "responseData"}, function(){
			$("#responseData")
				.css('opacity', 0)
				.fadeTo(400, 1);	
		});
	},

	togglePostBody: function(){
		if(this.state.selection != "postBody")
		{
			this.setState({postDisplay:{display:'inline-block'}}, function(){
				$('#responseData').hide();
				$("#postBody")
					.css('opacity', 0)
					.fadeTo("fast", 1);	
			});
			this.setState({rawResponseDisplay:{display:'none'}});
			this.setState({prettyResponseDisplay:{display:'none'}});
			this.setState({selection:"postBody"});
		}
	},

	toggleRawResponse: function(){
		if(this.state.selection != "rawResponse")
		{	
			this.setState({postDisplay:{display:'none'}});
			this.setState({rawResponseDisplay:{display:'block'}}, function(){
				$('#responseData').hide();
				$("#rawResponse")
					.css('opacity', 0)
					.fadeTo("fast", 1);	
			});
			this.setState({prettyResponseDisplay:{display:'none'}});
			this.setState({selection:"rawResponse"});
		}
	},

	togglePrettyResponse: function(){
		if(this.state.selection != "prettyResponse")
		{
			this.setState({postDisplay:{display:'none'}});
			this.setState({rawResponseDisplay:{display:'none'}});
			this.setState({prettyResponseDisplay:{display:'block'}}, function(){
				$('#responseData').hide();
				$("#prettyResponse")
					.css('opacity', 0)
					.fadeTo("fast", 1);	
			});
			this.setState({selection:"prettyResponse"});
		}
	},

	toggleResponseData: function(){
		if(this.state.selection != "responseData")
		{
			this.setState({postDisplay:{display:'none'}});
			this.setState({rawResponseDisplay:{display:'none'}});
			this.setState({prettyResponseDisplay:{display:'none'}}, function(){
				$('#responseData').show();
				$("#responseData")
					.css('opacity', 0)
					.fadeTo("fast", 1);	
			});
			this.setState({selection:"responseData"});
		}
	},

	render: function(){
		var event = this.props.data.event;
		var response;
		var postBody;
		var requestType;
		var error;
		var url;
		var node = [];

		if(event){
			response = event.response;
			postBody = event.postBody;
			requestType = event.requestType;
			error = event.error;
			url = event.url;			
		}else {
			response = this.props.data.response;
			postBody = this.props.data.postBody;
			requestType = this.props.data.requestType;
			error = this.props.data.error;
			url = this.props.data.url;
		}
		if (error || !response ) {
			node = [];
		}else {
			node.push(			
				<div id="response" key={Math.floor(Math.random() * 1000)} onLoad={this.hideData}>
					<div id="buttons">				
						<a id="redButton" onClick={this.togglePostBody}>POST Request</a>
						<a id="redButton" onClick={this.toggleRawResponse}>Raw Response</a>
						<a id="redButton" onClick={this.togglePrettyResponse}>Pretty Response</a>
						<a id="redButton" onClick={this.toggleResponseData}>Response Data</a>
					</div>
					<div id="postBody" style={this.state.postDisplay}><PostBody postBody={postBody} url={url} /></div>
					<div id="rawResponse" style={this.state.rawResponseDisplay}><RawResponse response={response} /></div>
					<div id="prettyResponse" style={this.state.prettyResponseDisplay}><PrettyResponse response={response} /></div>
					<div id="responseData" ><ResponseData response={response} requestType={requestType} /></div>
				</div>
			);
		}
		
		return (
			<div>{node}</div>
		)
	}
});

module.exports = ResponseList;