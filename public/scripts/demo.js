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
			<ResponseList data={this.state.receivedData} />
			</div>
		);
	}
});



var ResponseList = React.createClass({
	render: function(){
		var object = this.props.data;
		var responseNodes;
		var dataTitle;
		if(object) {
			dataTitle = <h2 id="dataTitle"> Returned Data: </h2>
			var secData = object.data[0].securityData;
			responseNodes = secData.map(function (sec) {
				var info = [];
				info.push(<h3 id="security"> {"SECURITY: " + sec.security.toUpperCase()} </h3>);
				for (var j in sec.fieldData)
				{
					var value = j;
					if (value.indexOf("_") != -1)
					{
						value = value.replace(/_/g, " ");
					}
					info.push(<h4 id="fieldData"> {value.trim().charAt(0).toUpperCase() + value.trim().slice(1).toLowerCase() + ": " + sec.fieldData[j]} </h4>)
				}
				return (
					<Response info = {info} />
				);
			});
		}
		return (
			<div className="responseList">
				<p className="data">
					{dataTitle}
					{responseNodes}
				</p>
			</div>
		)
	}
});



var Response = React.createClass({
	render: function(){
		return(
			<div className="response">
				<p className="responseInfo">
					{this.props.info}
				</p>
			</div>
		);
	}
});



var QueryForm = React.createClass({
	getInitialState: function() {
		return {
			showReqTypes: true,
			showSecurities: true,
			showFields: true,
			showSubmit: true,
			reqTypeChoice: ""
		};
	},
	handleQueryChoice: function(type) {
		this.setState({reqTypeChoice: React.findDOMNode(this.refs.service).value.toString() });
		if (type === "service"){
			this.setState({showReqTypes: false});
		}else if (type === "reqType") {
			this.setState({showSecurities: false});
		}else if (type === "securities"){
			this.setState({showFields: false});
		}else if (type === "fields"){
			this.setState({showSubmit: false});
		}else{
			return;
		}
		return;
	},
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
			<input type="text" list="services" placeholder="service" ref="service" id="formbox" onChange={this.handleQueryChoice.bind(null, "service")} />
				<datalist id="services">
					<option value="refdata">Reference Data Service</option>
					<option value="apiflds">API Field Information Service</option>
					<option value="tasvc">Technical Analysis Service</option>
					<option value="instruments">Instruments Service</option>
				</datalist>
			<br />
			<input type="text" list={this.state.reqTypeChoice} placeholder="request type" ref="type" id="formbox" disabled={this.state.showReqTypes} onChange={this.handleQueryChoice.bind(null, "reqType")}/>
				<datalist id="refdata">
					<option value="ReferenceDataRequest">Reference Data Request</option>
					<option value="HistoricalDataRequest">Historical Data Request</option>
					<option value="IntradayTickRequest">Intraday Tick Request</option>
					<option value="IntradayBarRequest">Intraday Bar Request</option>
					<option value="PortfolioDataRequest">Portfolio Data Request</option>
					<option value="BeqsRequest">Beqs Request</option>
				</datalist>
			<datalist id="apiflds">
					<option value="FieldInfoRequest">Field Info Request</option>
					<option value="FieldSearchRequest">Field Search Request</option>
					<option value="categorizedFieldSearchRequest">Categorized Field Search Request</option>
			</datalist>
			<datalist id="tasvc">
				<option value="studyRequest">Study Request</option>
			</datalist>
			<datalist id="instruments">
				<option value="InstrumentListRequest">Security Lookup Request</option>
			</datalist>

			<br />
			<input type="text" placeholder="securities" ref="securities" id="formbox" disabled={this.state.showSecurities} onChange={this.handleQueryChoice.bind(null, "securities")} />
			<br />
			<input type="text" placeholder="fields" ref="fields" id="formbox" disabled={this.state.showFields} onChange={this.handleQueryChoice.bind(null, "fields")} />
			<br />
			<input type="submit" value="Submit" id="submit" disabled={this.state.showSubmit} />
			<br />
			</form>
		);
		
	}
});




React.render(
<MainPage />,
document.body
);
