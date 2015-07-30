var React = require('react');

var ErrorMessage = React.createClass({
	render: function(){
		var error = this.props.error;
		var message = [];

		if(error){
			var type = error[0];
			var url = error[1];
			message.push(<h3 id="error" key={type} >ERROR! {type}</h3>);
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