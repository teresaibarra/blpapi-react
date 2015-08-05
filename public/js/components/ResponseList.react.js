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
	componentWillReceiveProps: function(){
		this.setState({postDisplay: {display:'none'}});
		this.setState({rawResponseDisplay: {display:'none'}});
		this.setState({prettyResponseDisplay: {display:'none'}});
		this.setState({selection: "responseData"});
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
		var data = this.props.data[0];
		var request = this.props.data[1];
		var type = this.props.data[2];
		var error = this.props.data[3];
		var url = this.props.data[4];
		var node = [];

		if (error || !data) {
			node = [];
		}else {
			node.push(			
				<div id="response" key={Math.floor(Math.random() * 1000)} onLoad={this.hideData}>
					<div id="buttons">				
						<a className="tab" onClick={this.togglePostBody}>POST Request</a>
						<a className="tab" onClick={this.toggleRawResponse}>Raw Response</a>
						<a className="tab" onClick={this.togglePrettyResponse}>Pretty Response</a>
						<a className="tab" onClick={this.toggleResponseData}>Response Data</a>
					</div>
					<div id="postBody" style={this.state.postDisplay}><PostBody request={request} url ={url} /></div>
					<div id="rawResponse" style={this.state.rawResponseDisplay}><RawResponse data={data} /></div>
					<div id="prettyResponse" style={this.state.prettyResponseDisplay}><PrettyResponse data={data} /></div>
					<div id="responseData" ><ResponseData data={data} type={type} /></div>
				</div>
			);
		}
		return (
			<div>{node}</div>
		)
	}
});

module.exports = ResponseList;