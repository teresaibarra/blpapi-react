var React = require('react');

var PostBody = React.createClass({
	render: function(){
		var title = "";
		var data = "";

		if (this.props.request){
			title = "POST Request Body:";
			data = JSON.stringify(this.props.request, null, 3);
		}

		return(
			<div className="postBody" id="postBody">
				<h2 id="dataTitle">{title}</h2>
				<pre className="postBodyInfo">{data}</pre>
			</div>
		);
	}
});

module.exports = PostBody;