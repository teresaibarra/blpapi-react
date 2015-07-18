var MainPage = React.createClass({
	getInitialState: function() {
		return {
			receivedData: ""
		};
	},
	componentDidMount: function() {

	},
	handleQuerySubmit: function(query, service, type) {
		return(
		$.ajax({
		    url: 'http://localhost:3000/request?ns=blp' + '&service=' + service + '&type=' + type, //URL to hit
		    type: 'POST', 
		    data: JSON.stringify(query),
		    success: function(data) {
		    	this.setState({receivedData: data});
		      }.bind(this),
		    error: function(xhr, status, err) {
		        console.error(this.props.url, status, err.toString());
		      }.bind(this)
	     }))
	},
	render: function() {
		return(
			<div>
			<h1>Bloomberg API Demo</h1>
			<h2>What would you like to look at?</h2>
			<h5>Pro-Tip: Separate multiple parameters with commas.</h5>
			<QueryForm onQuerySubmit={this.handleQuerySubmit} />
			<ReturnInfo data={this.state.receivedData} />
			</div>
		);
	}
});


var ReturnInfo = React.createClass({
	render: function(){
		var object = this.props.data;
		var returnedString;
		var dataTitle;
		if(object) {
			dataTitle = <h2 id="dataTitle"> Returned Data: </h2>
			var secData = object.data[0].securityData;
			returnedString = secData.map(function (sec) {
				var s = [];
				s.push(<h3 id="security"> {"SECURITY: " + sec.security.toUpperCase()} </h3>);
				for (var j in sec.fieldData)
				{
					var value = j;
					if (value.indexOf("_") != -1)
					{
						value = value.replace(/_/g, " ");
					}
					s.push(<h4 id="fieldData"> {value.trim().charAt(0).toUpperCase() + value.trim().slice(1).toLowerCase() + ": " + sec.fieldData[j]} </h4>)
				}
				return (
					{s}
				);
			});
		}
		return (
			<div className="returnInfo">
				<p className="data">
					{dataTitle}
					{returnedString}
				</p>
			</div>
		)
	}
});


var QueryForm = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var service = React.findDOMNode(this.refs.service).value.trim();
		var type = React.findDOMNode(this.refs.type).value.trim();
		var securities = React.findDOMNode(this.refs.securities).value.trim();
		var fields = React.findDOMNode(this.refs.fields).value.trim();
		if(!service || !type || !securities || !fields)
		{
			return;
		}
		securities = securities.split(",");
		fields = fields.split(",");
		securities.forEach(function (sec) {
			sec = sec.trim();
		});
		fields.forEach(function (fld){
			fld = fld.trim();
		})
		this.props.onQuerySubmit({securities: securities, fields: fields}, service, type);
		React.findDOMNode(this.refs.service).value = "";
		React.findDOMNode(this.refs.type).value = "";
		React.findDOMNode(this.refs.securities).value = "";
		React.findDOMNode(this.refs.fields).value = "";
		return;					
	},
	render: function() {
		return(
			<form className="queryForm" onSubmit={this.handleSubmit}>
			<input type="text" placeholder="service" ref="service" id="formbox" />
			<br />
			<input type="text" placeholder="request type (case-sensitive)" ref="type" id="formbox" />
			<br />
			<input type="text" placeholder="securities" ref="securities" id="formbox" />
			<br />
			<input type="text" placeholder="fields" ref="fields" id="formbox" />
			<br />
			<input type="submit" value="Submit" id="submit" />
			<br />
			</form>
		);
		
	}
});


React.render(
<MainPage />,
document.body
);
