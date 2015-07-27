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

		    this.refs.securities.getDOMNode().value = "";
		    this.refs.fields.getDOMNode().value = "";
		    this.refs.startDate.getDOMNode().value = "";
		    this.refs.endDate.getDOMNode().value = "";

			this.setState({reqTypeChoice: this.refs.type.getDOMNode().value.toString() }, function(){


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
				id="formbox" hidden={this.state.hideReqTypes} onChange={this.handleRequestChoice}/>

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

				<input type="text" list ="secD" placeholder="securities" ref="securities" id="formbox" hidden={this.state.hideSecurities}  />
				<datalist id="secD">
					<option value="AAPL US Equity">Security Lookup Request</option>
				</datalist>
				<br />

				<input type="text" list ="fieldsD" placeholder="fields" ref="fields" id="formbox" hidden={this.state.hideFields}  />
				<datalist id="fieldsD">
					<option value="PX_LAST">Security Lookup Request</option>
				</datalist>
				<br />

				<input type="text" list="startD" placeholder="start date" ref="startDate" id="formbox" hidden={this.state.hideStartDate}  />
				<datalist id="startD">
					<option value="20140101">Security Lookup Request</option>
				</datalist>
				<br />

				<input type="text" list="endD" placeholder="end date" ref="endDate" id="formbox" hidden={this.state.hideEndDate}  />
				<datalist id="endD">
					<option value="20141231">Security Lookup Request</option>
				</datalist>
				<br />

				<input type="submit" value="Submit" id="submit" hidden={this.state.hideSubmit} />

				<br />

			</form>
		);
		
	},

	_onSubmit: function(e){
		e.preventDefault();

		if (this.state.reqTypeChoice === "ReferenceDataRequest") {
			var service = this.refs.service.getDOMNode().value.trim();
			var type = this.refs.type.getDOMNode().value.trim();
			var securities = this.refs.securities.getDOMNode().value.trim();
			var fields = this.refs.fields.getDOMNode().value.trim();


			AppActions.submitReferenceQuery([service, type, securities, fields]);

			this.setState({hideReqTypes:true});
			this.setState({hideSecurities: true});
			this.setState({hideFields: true});
			this.setState({hideSubmit: true});

			this.refs.service.getDOMNode().value = "";
		    this.refs.type.getDOMNode().value = "";
		    this.refs.securities.getDOMNode().value = "";
		    this.refs.fields.getDOMNode().value = "";
		}
		else if (this.state.reqTypeChoice === "HistoricalDataRequest"){
			var service = this.refs.service.getDOMNode().value.trim();
			var type = this.refs.type.getDOMNode().value.trim();
			var securities = this.refs.securities.getDOMNode().value.trim();
			var fields = this.refs.fields.getDOMNode().value.trim();
			var startDate = this.refs.startDate.getDOMNode().value.trim();
			var endDate = this.refs.endDate.getDOMNode().value.trim();

			AppActions.submitHistoricalQuery([service, type, securities, fields, startDate, endDate]);

			this.setState({hideReqTypes:true});
			this.setState({hideSecurities: true});
			this.setState({hideFields: true});
			this.setState({hideStartDate: true});
			this.setState({hideEndDate: true});
			this.setState({hideSubmit: true});

			this.refs.service.getDOMNode().value = "";
		    this.refs.type.getDOMNode().value = "";
		    this.refs.securities.getDOMNode().value = "";
		    this.refs.fields.getDOMNode().value = "";
		    this.refs.startDate.getDOMNode().value = "";
		    this.refs.endDate.getDOMNode().value = "";
		}
		else if (this.state.reqTypeChoice === "IntradayTickRequest"){
			this.setState({hideReqTypes:true});
			this.setState({hideSubmit: true});
		}
		else if (this.state.reqTypeChoice === "IntradayBarRequest"){
			this.setState({hideReqTypes:true});
			this.setState({hideSubmit: true});
		}
		else if (this.state.reqTypeChoice === "PortfolioDataRequest"){
			this.setState({hideReqTypes:true});
			this.setState({hideSubmit: true});
		}
		else if (this.state.reqTypeChoice === "BeqsRequest"){
			this.setState({hideReqTypes:true});
			this.setState({hideSubmit: true});
		}
		else{
			return;
		}

	    this.setState({servTypeChoice: ""});
	    this.setState({reqTypeChoice: ""});

	}
});

module.exports = QueryForm;