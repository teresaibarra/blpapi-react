var React = require('react');

var PostBody = React.createClass({
	render: function(){
		var title = "";
		var data = "";
		var url = "";
		var dataTitle = "";
		var urlTitle = "";

		if (this.props.request){
			title = "POST Request";
			urlTitle = "URL: ";
			url = this.props.url;
			dataTitle = "BODY:";
			data = JSON.stringify(this.props.request, null, 3);
		}

		return(
			<div className="postBody" id="postBody">
				<h2 id="dataTitle">{title}</h2>
				<h3>{urlTitle}</h3>
				<h5 id="url">{url}</h5>
				<h3>{dataTitle}</h3>
				<pre className="postBodyInfo">{data}</pre>
			</div>
		);
	}
});

module.exports = PostBody;