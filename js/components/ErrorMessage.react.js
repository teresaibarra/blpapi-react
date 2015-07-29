var React = require('react');

var ErrorMessage = React.createClass({
	render: function(){
		var error = this.props.error;
		var message = [];

		if(error){
			var type = error[2];
			var url = error[0];
			message.push(<h4 id="error" key={type} >ERROR! {type}</h4>);
			message.push(<h4 id="error" key={url}>URL: {url}</h4>);
		}else {
			message = [];
		}

		return(
			<div>
				{message}
			</div>
		);
	}
});
module.exports = ErrorMessage;