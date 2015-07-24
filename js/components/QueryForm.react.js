var React = require('react');
var AppActions = require('../actions/AppActions');

var QueryForm = React.createClass({
	getInitialState: function() {
		return {
			hideReqTypes: true,
			hideSecurities: true,
			hideFields: true,
			hideSubmit: true,
			reqTypeChoice: ""
		};
	},
	handleQueryChoice: function(type) {
		this.setState({reqTypeChoice: this.refs.service.getDOMNode().value.toString() });
		if (type === "service"){
			this.setState({hideReqTypes: false});
		}else if (type === "reqType") {
			this.setState({hideSecurities: false});
		}else if (type === "securities"){
			this.setState({hideFields: false});
		}else if (type === "fields"){
			this.setState({hideSubmit: false});
		}else{
			return;
		}
		return;
	},
	render: function() {
		return(
			<form className="queryForm" onSubmit={this._onSubmit}>
			<input type="text" list="services" placeholder="service" ref="service" 
			id="formbox" onChange={this.handleQueryChoice.bind(null, "service")} />
				<datalist id="services">
					<option value="refdata">Reference Data Service</option>
					<option value="apiflds">API Field Information Service</option>
					<option value="tasvc">Technical Analysis Service</option>
					<option value="instruments">Instruments Service</option>
				</datalist>
			<br />
			<input type="text" list={this.state.reqTypeChoice} placeholder="request type" ref="type" 
			id="formbox" disabled={this.state.hideReqTypes} onChange={this.handleQueryChoice.bind(null, "reqType")}/>
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
			<input type="text" list="defSec" placeholder="securities" ref="securities" id="formbox" 
			disabled={this.state.hideSecurities} onChange={this.handleQueryChoice.bind(null, "securities")} />
			<datalist id="defSec">
					<option value="AAPL US EQUITY">AAPL US EQUITY</option>
			</datalist>
			<br />
			<input type="text" list="defFields" placeholder="fields" ref="fields" id="formbox" disabled={this.state.hideFields} 
			onChange={this.handleQueryChoice.bind(null, "fields")} />
			<datalist id="defFields">
					<option value="Volume">Volume</option>
			</datalist>
			<br />
			<input type="submit" value="Submit" id="submit" disabled={this.state.hideSubmit} />
			<br />
			</form>
		);
		
	},
	_onSubmit: function(e){
		e.preventDefault();

		var service = this.refs.service.getDOMNode().value.trim();
		var type = this.refs.type.getDOMNode().value.trim();
		var securities = this.refs.securities.getDOMNode().value.trim();
		var fields = this.refs.fields.getDOMNode().value.trim();
		AppActions.submitQuery([service, type, securities, fields]);

		this.refs.service.getDOMNode().value = "";
	    this.refs.type.getDOMNode().value = "";
	    this.refs.securities.getDOMNode().value = "";
	    this.refs.fields.getDOMNode().value = "";

	    this.setState({hideReqTypes: true});
	    this.setState({hideSecurities: true});
	    this.setState({hideFields: true});
	    this.setState({hideSubmit: true});
	}
});

module.exports = QueryForm;