var React = require('react');

var PostBody = React.createClass({
	render: function(){
		var responseTitle;
		var urlTitle;
		var url;
		var bodyTitle;
		var postBody;

		if (this.props.postBody){
			responseTitle = "POST Request";
			urlTitle = "URL: ";
			url = this.props.url;
			bodyTitle = "BODY:";
			postBody = JSON.stringify(this.props.postBody, null, 3);
		}

		return(
			<div className="postBody" id="postBody" >
				<h2 id="responseTitle">{responseTitle}</h2>
				<h3>{urlTitle}</h3>
				<h5 id="url">{url}</h5>
				<h3>{bodyTitle}</h3>
				<pre className="postBodyInfo">{postBody}</pre>
			</div>
		);
	}
});

module.exports = PostBody;