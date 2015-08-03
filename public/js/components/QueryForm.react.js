var React = require('react');
var AppActions = require('../actions/AppActions');


var QueryForm = React.createClass({
	getInitialState: function() {
		return {
			hideUrl: true,
			hideSecurities: false,
			hideReqTypes: true,
			hideSecurities: true,
			hideFields: true,
			hideSubmit: true,
			hideStartDate: true,
			hideEndDate: true,
			hidePeriod: true,
			hidePostTextArea: true,
			servTypeChoice: "",
			reqTypeChoice: ""
		};
	},

	handleServiceChoice: function() {
		this.setState({servTypeChoice: this.refs.service.getDOMNode().value.toString()}, function(){
			if (this.state.servTypeChoice != "")
			{
			    this.refs.securities.getDOMNode().value = "";
			    this.refs.fields.getDOMNode().value = "";
			    this.refs.startDate.getDOMNode().value = "";
			    this.refs.endDate.getDOMNode().value = "";
			    this.refs.period.getDOMNode().value = "";

				this.setState({hideReqTypes: false});
				this.setState({hideSubmit: true});

				return;
			}
			else if (this.state.servTypeChoice === ""){
				this.refs.type.getDOMNode().value = "";
			    this.refs.securities.getDOMNode().value = "";
			    this.refs.fields.getDOMNode().value = "";
			    this.refs.startDate.getDOMNode().value = "";
			    this.refs.endDate.getDOMNode().value = "";
			    this.refs.period.getDOMNode().value = "";

				this.setState({hideReqTypes:true});
				this.setState({hideSecurities: true});
				this.setState({hideFields: true});
				this.setState({hideStartDate: true});
				this.setState({hideEndDate: true});
				this.setState({hidePeriod: true});

				this.setState({hideSubmit: true});
				return;		
			}
			else {
				return;
			}
		});

	},
	
	handleRequestChoice: function() {
		if (this.refs.type){
			this.setState({hideSecurities: true});
			this.setState({hideFields: true});
			this.setState({hideStartDate: true});
			this.setState({hideEndDate: true});
			this.setState({hidePeriod: true});
			this.setState({hideSubmit: true});

		    this.refs.securities.getDOMNode().value = "";
		    this.refs.fields.getDOMNode().value = "";
		    this.refs.startDate.getDOMNode().value = "";
		    this.refs.endDate.getDOMNode().value = "";
		    this.refs.period.getDOMNode().value = "";

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
					this.setState({hidePeriod: false});
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
					this.setState({hideSubmit: false});
					return;
				}
			});
		}
	},
	handleCheckBox: function() {
		if (checkBox.checked){
			this.setState({hideService: true});
			this.setState({hideReqTypes:true});
			this.setState({hideSecurities: true});
			this.setState({hideFields: true});
			this.setState({hideStartDate: true});
			this.setState({hideEndDate: true});
			this.setState({hidePeriod: true});

			this.setState({hideUrl: false});
			this.setState({hidePostTextArea: false});
			this.setState({hideSubmit: false});

			this.refs.service.getDOMNode().value = "";
			this.refs.type.getDOMNode().value = "";
		    this.refs.securities.getDOMNode().value = "";
		    this.refs.fields.getDOMNode().value = "";
		    this.refs.startDate.getDOMNode().value = "";
		    this.refs.endDate.getDOMNode().value = "";
		    this.refs.period.getDOMNode().value = "";

		} else {
			this.setState({hideUrl: true});
			this.setState({hidePostTextArea: true});
			this.setState({hideSecurities: true});
			this.setState({hideFields: true});
			this.setState({hideStartDate: true});
			this.setState({hideEndDate: true});
			this.setState({hidePeriod: true});
			this.setState({hideSubmit: true});

			this.setState({hideService: false});

			this.refs.url.getDOMNode().value = "";
		    this.refs.postTextArea.getDOMNode().value = "";
		    this.refs.securities.getDOMNode().value = "";
		    this.refs.fields.getDOMNode().value = "";
		    this.refs.startDate.getDOMNode().value = "";
		    this.refs.endDate.getDOMNode().value = "";
		    this.refs.period.getDOMNode().value = "";
		}
		return;
	},
	render: function() {
		var masterList = this.props.list;
		var datalists = [];
		var services = [];
		for (var property in masterList) {
			if(masterList.hasOwnProperty(property)) {
				var options = [];
				for (var i = 0; i < masterList[property].Requests.length; i++) {
					options.push(<option value={masterList[property].Requests[i].RequestType} key={masterList[property].Requests[i].RequestType}>
						{masterList[property].Requests[i].RequestName}</option>);
				}
				datalists.push(
					<datalist id={property} key={property}>
						{options}
					</datalist>	
				);
				services.push(<option value={property} key={property}>{masterList[property].ServiceName}</option>);
			}
		}
		datalists.push(
			<datalist id="services" key="">
				{services}
			</datalist>	);
		return(
			<div id="queryDiv">
				<form className="queryForm" id="queryForm" onSubmit={this._onSubmit}>

					Raw: <input type="checkbox" id="checkBox" onClick={this.handleCheckBox}></input>

					{datalists}

					<br />

					<input type="text" placeholder="url" ref="url" id="formbox" hidden={this.state.hideUrl}/>

					<input type="text" list="services" placeholder="service" ref="service" 
					id="formbox" hidden={this.state.hideService} onChange={this.handleServiceChoice} />

					<input type="text" list={this.state.servTypeChoice} placeholder="request type" ref="type" 
					id="formbox" hidden={this.state.hideReqTypes} onChange={this.handleRequestChoice}/>


					<input type="text" placeholder="securities" ref="securities" id="formbox" hidden={this.state.hideSecurities}  />

					<input type="text" placeholder="fields" ref="fields" id="formbox" hidden={this.state.hideFields}  />

					<input type="text" placeholder="start date" ref="startDate" id="formbox" hidden={this.state.hideStartDate}  />
			
					<input type="text" placeholder="end date" ref="endDate" id="formbox" hidden={this.state.hideEndDate}  />

					<input type="text" placeholder="periodicity" ref="period" id="formbox" hidden={this.state.hidePeriod}  />
				
					<textarea rows="4" cols="50" placeholder="Enter post body here." ref="postTextArea" hidden={this.state.hidePostTextArea} />

					<br />

					<input type="submit" value="Submit" id="submit" hidden={this.state.hideSubmit} />
				</form>
			</div>
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
			var period = this.refs.period.getDOMNode().value.trim();

			AppActions.submitHistoricalQuery([service, type, securities, fields, startDate, endDate, period]);

			this.setState({hideReqTypes:true});
			this.setState({hideSecurities: true});
			this.setState({hideFields: true});
			this.setState({hideStartDate: true});
			this.setState({hideEndDate: true});
			this.setState({hidePeriod: true});
			this.setState({hideSubmit: true});

			this.refs.service.getDOMNode().value = "";
		    this.refs.type.getDOMNode().value = "";
		    this.refs.securities.getDOMNode().value = "";
		    this.refs.fields.getDOMNode().value = "";
		    this.refs.startDate.getDOMNode().value = "";
		    this.refs.endDate.getDOMNode().value = "";
		    this.refs.period.getDOMNode().value = "";
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
			var url = this.refs.url.getDOMNode().value.trim();
			var postTextArea = this.refs.postTextArea.getDOMNode().value.trim();

			AppActions.submitTextAreaQuery([url, postTextArea]);

			checkBox.checked = false;
			this.setState({hideReqTypes:true});
			this.setState({hideUrl: true});
			this.setState({hidePostTextArea: true});
			this.setState({hideSubmit: true});
			this.setState({hideService:false});

			this.refs.url.getDOMNode().value = "";
		    this.refs.postTextArea.getDOMNode().value = "";
		}
	    this.setState({servTypeChoice: ""});
	    this.setState({reqTypeChoice: ""});
	}
});

module.exports = QueryForm;