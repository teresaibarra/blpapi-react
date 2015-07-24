var React = require('react');
var AppActions = require('../actions/AppActions');

var QueryForm = React.createClass({

	getInitialState: function() {
		return {
			hideReqTypes: true,
			hideSecurities: true,
			hideFields: true,
			hideSubmit: true,
			hideStartDate: true,
			hideEndDate: true,
			servTypeChoice: "",
			reqTypeChoice: ""
		};
	},

	handleServiceChoice: function() {
		if (this.refs.service)
		{
			this.setState({servTypeChoice: this.refs.service.getDOMNode().value.toString() });
			this.setState({hideReqTypes: false});

			return;
		}
		return;
	},

	handleRequestChoice: function() {
		if (this.refs.type){

			this.setState({hideSecurities: true});
			this.setState({hideFields: true});
			this.setState({hideStartDate: true});
			this.setState({hideEndDate: true});
			this.setState({hideSubmit: true});

			this.setState({reqTypeChoice: this.refs.type.getDOMNode().value.toString() }, function(){
				console.log(this.refs.type.getDOMNode().value.toString())

				if (this.state.reqTypeChoice === "ReferenceDataRequest") {
					this.setState({hideSecurities: false});
					this.setState({hideFields: false});
					this.setState({hideSubmit: false});
				}
				else if (this.state.reqTypeChoice === "HistoricalDataRequest"){
					this.setState({hideSecurities: false});
					this.setState({hideFields: false});
					this.setState({hideStartDate: false});
					this.setState({hideEndDate: false});
					this.setState({hideSubmit: false});
				}
				else if (this.state.reqTypeChoice === "IntradayTickRequest"){
					this.setState({hideSubmit: false});
				}
				else if (this.state.reqTypeChoice === "IntradayBarRequest"){
					this.setState({hideSubmit: false});
				}
				else if (this.state.reqTypeChoice === "PortfolioDataRequest"){
					this.setState({hideSubmit: false});
				}
				else if (this.state.reqTypeChoice === "BeqsRequest"){
					this.setState({hideSubmit: false});
				}
				else{
					return;
				}
			});
			
			
		}
	},

	render: function() {
		return(
			<form className="queryForm" onSubmit={this._onSubmit}>
				<input type="text" list="services" placeholder="service" ref="service" 
				id="formbox" onChange={this.handleServiceChoice} />

					<datalist id="services">
						<option value="refdata">Reference Data Service</option>
						<option value="apiflds">API Field Information Service</option>
						<option value="tasvc">Technical Analysis Service</option>
						<option value="instruments">Instruments Service</option>
					</datalist>

				<br />

				<input type="text" list={this.state.servTypeChoice} placeholder="request type" ref="type" 
				id="formbox" disabled={this.state.hideReqTypes} onChange={this.handleRequestChoice}/>

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

				<input type="text" placeholder="securities" ref="securities" id="formbox" 
				disabled={this.state.hideSecurities}  />

				<br />

				<input type="text" placeholder="fields" ref="fields" id="formbox" disabled={this.state.hideFields}  />

				<br />

				<input type="text" placeholder="start date" ref="startDate" id="formbox" disabled={this.state.hideStartDate}  />

				<br />

				<input type="text" placeholder="end date" ref="endDate" id="formbox" disabled={this.state.hideEndDate}  />

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
	    this.refs.startDate.getDOMNode().value = "";
	    this.refs.endDate.getDOMNode().value = "";

	    this.setState({hideReqTypes: true});
	    this.setState({hideSecurities: true});
	    this.setState({hideFields: true});
	    this.setState({hideStartDate: true});
	    this.setState({hideEndDate: true});
	    this.setState({hideSubmit: true});
	}
});

module.exports = QueryForm;