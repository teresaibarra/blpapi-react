var React = require('react');

var ErrorMessage = React.createClass({
	render: function(){
		var error = this.props.error;
		var message = [];

		if(error){
			var type = error.type;
			message.push(<h3 id="error" key={type} >ERROR! {type}</h3>);
			$("#error")
				.css('opacity', 0)
				.fadeTo("fast", 1);	
		}else {
			message = [];
		}

		return(
			<div id="error">
				{message}
			</div>
		);
	}
});

module.exports = ErrorMessage;