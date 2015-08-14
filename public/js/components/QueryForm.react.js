var React = require('react');
var AppActions = require('../actions/AppActions');

var QueryForm = React.createClass({
	getInitialState: function() {
		return {
			hideUrl: true,
			hideService: false,
			hideRequestType: true,
			hideSecurities: true,
			hideFields: true,
			hideSubmit: true,
			hideStartDate: true,
			hideEndDate: true,
			hidePeriod: true,
			hideTextArea: true,
			hideClear: true,
			serviceChoice: null,
			requestTypeChoice: null,
			formFormat: null
		};
	},

	componentWillReceiveProps: function(nextProps){
		var event;
		if(nextProps.event){
			event = nextProps.event;
			this.setState({hideSecurities: true});
			this.setState({hideFields: true});
			this.setState({hideStartDate: true});
			this.setState({hideEndDate: true});
			this.setState({hidePeriod: true});
			this.setState({hideUrl: true});

			this.setState({hideService: false});
			this.setState({hideRequestType:false});
			this.setState({hideTextArea: false});
			this.setState({hideClear: false});
			this.setState({hideSubmit: false}, function(){
				checkBox.checked = false;

				this.refs.securities.getDOMNode().value = null;
			    this.refs.fields.getDOMNode().value = null;
			    this.refs.startDate.getDOMNode().value = null;
			    this.refs.endDate.getDOMNode().value = null;
			    this.refs.period.getDOMNode().value = null;

			    this.refs.service.getDOMNode().value = event.service;
			    this.refs.requestType.getDOMNode().value = event.requestType;
			    this.refs.textArea.getDOMNode().value = JSON.stringify(event.request.postBody, null, 3);

			    this.setState({formFormat: "servTypeBody"}, function(){
					this.setState({serviceChoice: this.refs.service.getDOMNode().value});
					this.setState({requestTypeChoice: this.refs.requestType.getDOMNode().value});
			    });
			});
		}
	},

	handleServiceChoice: function() {
		this.setState({serviceChoice: this.refs.service.getDOMNode().value.toString()}, function(){
			if (this.state.serviceChoice)
			{	
				if(this.state.serviceChoice === "refdata" || this.state.serviceChoice === "apiflds" 
					|| this.state.serviceChoice === "tasvc"|| this.state.serviceChoice === "instruments"){
					this.setState({formFormat: null});

				    this.refs.securities.getDOMNode().value = null;
				    this.refs.fields.getDOMNode().value = null;
				    this.refs.startDate.getDOMNode().value = null;
				    this.refs.endDate.getDOMNode().value = null;
				    this.refs.period.getDOMNode().value = null;

				    this.setState({hideService: false});
					this.setState({hideRequestType: false});

					this.setState({hideUrl: true});
					this.setState({hideTextArea: true});
					this.setState({hideSubmit: true});
					this.setState({hideClear: true});
					return;					
				}
				else{
					this.setState({formFormat: "servTypeBody"});
					this.setState({hideSecurities: true});
					this.setState({hideFields: true});
					this.setState({hideStartDate: true});
					this.setState({hideEndDate: true});
					this.setState({hidePeriod: true});
					this.setState({hideUrl: true});

					this.setState({hideService: false});
					this.setState({hideRequestType:false});
					this.setState({hideTextArea: false});
					this.setState({hideSubmit: false});
					this.setState({hideClear: false});

				    this.refs.securities.getDOMNode().value = null;
				    this.refs.fields.getDOMNode().value = null;
				    this.refs.startDate.getDOMNode().value = null;
				    this.refs.endDate.getDOMNode().value = null;
				    this.refs.period.getDOMNode().value = null;

					return;
				}
			}
			else{
				this.setState({formFormat: null});
				this.refs.requestType.getDOMNode().value = null;
			    this.refs.securities.getDOMNode().value = null;
			    this.refs.fields.getDOMNode().value = null;
			    this.refs.startDate.getDOMNode().value = null;
			    this.refs.endDate.getDOMNode().value = null;
			    this.refs.period.getDOMNode().value = null;

			    this.setState({hideService:false});

				this.setState({hideRequestType:true});
				this.setState({hideSecurities: true});
				this.setState({hideFields: true});
				this.setState({hideStartDate: true});
				this.setState({hideEndDate: true});
				this.setState({hidePeriod: true});
				this.setState({hideSubmit: true});
				this.setState({hideClear: true});

				this.setState({hideTextArea: true});

				return;		
			}
		});
	},

	handleRequestTypeChoice: function() {
		this.setState({requestTypeChoice: this.refs.requestType.getDOMNode().value.toString()}, function(){
			if (this.state.requestTypeChoice){
					this.setState({hideSecurities: true});
					this.setState({hideFields: true});
					this.setState({hideStartDate: true});
					this.setState({hideEndDate: true});
					this.setState({hidePeriod: true});
					this.setState({hideSubmit: true});
					this.setState({hideClear: true});

				    this.refs.securities.getDOMNode().value = null;
				    this.refs.fields.getDOMNode().value = null;
				    this.refs.startDate.getDOMNode().value = null;
				    this.refs.endDate.getDOMNode().value = null;
				    this.refs.period.getDOMNode().value = null;

					if (this.state.requestTypeChoice === "ReferenceDataRequest" && !this.refs.textArea.getDOMNode().value) {
						this.setState({formFormat: "refData"});
						this.setState({hideSecurities: false});
						this.setState({hideFields: false});
						this.setState({hideSubmit: false});
						this.setState({hideClear: false});

						this.setState({hideTextArea: true});
					}
					else if (this.state.requestTypeChoice === "HistoricalDataRequest" && !this.refs.textArea.getDOMNode().value){
						this.setState({formFormat: "hisData"});
						this.setState({hideSecurities: false});
						this.setState({hideFields: false});
						this.setState({hideStartDate: false});
						this.setState({hideEndDate: false});
						this.setState({hidePeriod: false});
						this.setState({hideSubmit: false});
						this.setState({hideClear: false});

						this.setState({hideTextArea: true});
					}
					else{
						this.setState({formFormat: "servTypeBody"});
						this.setState({hideSecurities: true});
						this.setState({hideFields: true});
						this.setState({hideStartDate: true});
						this.setState({hideEndDate: true});
						this.setState({hidePeriod: true});
						this.setState({hideUrl: true});

						this.setState({hideService: false});
						this.setState({hideRequestType:false});
						this.setState({hideTextArea: false});
						this.setState({hideSubmit: false});
						this.setState({hideClear: false});

						return;
					}
				}
			else if (this.refs.textArea.getDOMNode().value)	{
				this.setState({formFormat: "servTypeBody"});
				this.setState({hideSecurities: true});
				this.setState({hideFields: true});
				this.setState({hideStartDate: true});
				this.setState({hideEndDate: true});
				this.setState({hidePeriod: true});
				this.setState({hideUrl: true});

				this.setState({hideService: false});
				this.setState({hideRequestType:false});
				this.setState({hideTextArea: false});
				this.setState({hideSubmit: false});
				this.setState({hideClear: false});
			}
			else {
				this.setState({formFormat: null});
			    this.refs.securities.getDOMNode().value = null;
			    this.refs.fields.getDOMNode().value = null;
			    this.refs.startDate.getDOMNode().value = null;
			    this.refs.endDate.getDOMNode().value = null;
			    this.refs.period.getDOMNode().value = null;
			    this.refs.textArea.getDOMNode().value = null;

				this.setState({hideTextArea: true});
				this.setState({hideUrl: true});
				this.setState({hideSecurities: true});
				this.setState({hideFields: true});
				this.setState({hideStartDate: true});
				this.setState({hideEndDate: true});
				this.setState({hidePeriod: true});
				this.setState({hideSubmit: true});
				this.setState({hideClear: true});

				return;
			}
		});
	},

	handleCheckBox: function() {
		var service = this.refs.service.getDOMNode().value.trim();
		var requestType = this.refs.requestType.getDOMNode().value.trim();
		var securities = this.refs.securities.getDOMNode().value.trim();
		var fields = this.refs.fields.getDOMNode().value.trim();
		var startDate = this.refs.startDate.getDOMNode().value.trim();
		var endDate = this.refs.endDate.getDOMNode().value.trim();
		var period = this.refs.period.getDOMNode().value.trim();
		var textArea = this.refs.textArea.getDOMNode().value.trim();

		var cleanSecurities = [];
		var cleanFields = [];

		if (checkBox.checked){
			this.setState({formFormat: "urlBody"}, function(){
			if(this.state.formFormat === "refData"){
					this.setState({hideRequestType:true});
					this.setState({hideSecurities: true});
					this.setState({hideFields: true});
					this.setState({hideStartDate: true});
					this.setState({hideEndDate: true});
					this.setState({hidePeriod: true});
					this.setState({hideUrl: true});
					this.setState({hideTextArea: true});
					this.setState({hideSubmit: true});
					this.setState({hideClear: true});
					this.setState({hideService: true});

					this.setState({hideUrl: false});
					this.setState({hideTextArea: false});
					this.setState({hideSubmit: false});
					this.setState({hideClear: false});

					var url = 'http://localhost:3000/request?ns=blp' + '&service=refdata' + '&type=ReferenceDataRequest';
					this.refs.url.getDOMNode().value = url

					securities = securities.split(",");
					fields = fields.split(",");

					securities.forEach(function (sec) {
						sec = sec.trim();
						cleanSecurities.push('"'+ sec +'"');
					});
					fields.forEach(function (fld){
						fld = fld.trim();
						cleanFields.push('"' + fld + '"');
					})
					this.refs.textArea.getDOMNode().value = "{" + '"securities": [' + cleanSecurities.toString() + '], "fields": [' + cleanFields.toString() + "] }";

				}else if(this.state.formFormat === "hisData"){

					this.setState({hideRequestType:true});
					this.setState({hideSecurities: true});
					this.setState({hideFields: true});
					this.setState({hideStartDate: true});
					this.setState({hideEndDate: true});
					this.setState({hidePeriod: true});
					this.setState({hideUrl: true});
					this.setState({hideTextArea: true});
					this.setState({hideSubmit: true});
					this.setState({hideClear: true});
					this.setState({hideService: true});

					this.setState({hideUrl: false});
					this.setState({hideTextArea: false});
					this.setState({hideSubmit: false});
					this.setState({hideClear: false});

					var url = 'http://localhost:3000/request?ns=blp' + '&service=refdata' + '&type=ReferenceDataRequest';
					this.refs.url.getDOMNode().value = url

					securities = securities.split(",");
					fields = fields.split(",");

					securities.forEach(function (sec) {
						sec = sec.trim();
						cleanSecurities.push('"'+ sec +'"');
					});
					fields.forEach(function (fld){
						fld = fld.trim();
						cleanFields.push('"' + fld + '"');
					})

					this.refs.textArea.getDOMNode().value = "{" + '"securities": [' + cleanSecurities.toString() + '], "fields": [' + cleanFields.toString() + 
					'] "startDate": "' + startDate + '", "endDate": "' + endDate + '", "periodicitySelection": "' + period + '" }';

				}else {
					this.setState({hideRequestType:true});
					this.setState({hideSecurities: true});
					this.setState({hideFields: true});
					this.setState({hideStartDate: true});
					this.setState({hideEndDate: true});
					this.setState({hidePeriod: true});
					this.setState({hideUrl: true});
					this.setState({hideTextArea: true});
					this.setState({hideSubmit: true});
					this.setState({hideClear: true});
					this.setState({hideService: true});

					this.setState({hideUrl: false});
					this.setState({hideTextArea: false});
					this.setState({hideSubmit: false});
					this.setState({hideClear: false});

					if(this.state.serviceChoice && this.state.requestTypeChoice){
						this.refs.url.getDOMNode().value = 'http://localhost:3000/request?ns=blp&service=' + this.state.serviceChoice + '&type=' + this.state.requestTypeChoice;
					}else {
						this.refs.url.getDOMNode().value = null;
					}				
				}
			});
		} else{
			if(!this.refs.url.getDOMNode().value){
				this.refs.service.getDOMNode().value = null;
				this.refs.requestType.getDOMNode().value = null;

				this.setState({serviceChoice: this.refs.service.getDOMNode().value});
				this.setState({requestTypeChoice: this.refs.requestType.getDOMNode().value});

				this.handleServiceChoice();
				this.handleRequestTypeChoice();
			}
			else{
				this.setState({hideUrl: true});

				this.setState({hideService: false});
				this.setState({hideRequestType: false});
				this.setState({hideSubmit: false});
				this.setState({hideClear: false});

				if (this.refs.url.getDOMNode().value.indexOf("http://localhost:3000/") != -1){
					var url = this.refs.url.getDOMNode().value;
					var typeIndex = url.indexOf("type=") + 5;
					this.refs.requestType.getDOMNode().value = url.substring(typeIndex);

					var serviceIndex = url.indexOf("service=") + 8;
					this.refs.service.getDOMNode().value = url.substring(serviceIndex, typeIndex - 6);

					this.setState({serviceChoice: this.refs.service.getDOMNode().value});
					this.setState({requestTypeChoice: this.refs.requestType.getDOMNode().value}, function(){

						var textArea = this.refs.textArea.getDOMNode().value.trim();
						try {
							JSON.parse(textArea);
						} catch (e) {
							AppActions.handleError({
								type: "This is not a valid JSON string."});
						}
						textArea = JSON.parse(textArea);

						if(this.state.requestTypeChoice === "ReferenceDataRequest"){
							this.setState({formFormat: "refData"})

							this.setState({hideSecurities: false}, function(){
								if(textArea.securities){
									this.refs.securities.getDOMNode().value = textArea.securities;
								}
							});
							this.setState({hideFields: false}, function(){
								if(textArea.fields){
									this.refs.fields.getDOMNode().value = textArea.fields;
								}							
							});

							this.setState({hideTextArea: true});

						}else if (this.state.requestTypeChoice === "HistoricalDataRequest"){
							this.setState({formFormat: "hisData"})
							this.setState({hideSecurities: false}, function(){
								if(textArea.securities){
									this.refs.securities.getDOMNode().value = textArea.securities;
								}
							});
							this.setState({hideFields: false}, function(){
								if(textArea.fields){
									this.refs.fields.getDOMNode().value = textArea.fields;
								}						
							});

							this.setState({hideStartDate: false}, function(){
								if(textArea.startDate){
									this.refs.startDate.getDOMNode().value = textArea.startDate;
								}						
							});

							this.setState({hideEndDate: false}, function(){
								if(textArea.endDate){
									this.refs.endDate.getDOMNode().value = textArea.endDate;
								}							
							});

							this.setState({hidePeriod: false}, function(){
								if(textArea.periodicitySelection){
									this.refs.period.getDOMNode().value = textArea.periodicitySelection;
								}							
							});

							this.setState({hideTextArea: true});

						}else {
							this.setState({formFormat: "servTypeBody"})
							this.setState({hideTextArea: false});
						}
					});




				}
				//unknown URL
				else {
					this.handleServiceChoice();
					this.handleRequestTypeChoice();
				}				
			}
		}
		return;
	},

	handleClear: function(){
		checkBox.checked = false;

		this.setState({hideService:false});

		this.setState({hideRequestType:true});
		this.setState({hideSecurities: true});
		this.setState({hideFields: true});
		this.setState({hideStartDate: true});
		this.setState({hideEndDate: true});
		this.setState({hidePeriod: true});
		this.setState({hideUrl: true});
		this.setState({hideTextArea: true});

		this.setState({hideSubmit: true});
		this.setState({hideClear: true});

		this.refs.service.getDOMNode().value = null;
		this.refs.requestType.getDOMNode().value = null;
		this.refs.securities.getDOMNode().value = null;
		this.refs.fields.getDOMNode().value = null;
		this.refs.startDate.getDOMNode().value = null;
		this.refs.endDate.getDOMNode().value = null;
		this.refs.period.getDOMNode().value = null;
		this.refs.url.getDOMNode().value = null;
		this.refs.textArea.getDOMNode().value = null;

		this.setState({serviceChoice: null});
		this.setState({requestTypeChoice: null});

		this.setState({formFormat: null});
	},

	render: function() {
		var masterList = this.props.list;
		var datalists = [];
		var services = [];
		var clearButton;

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
			<datalist id="services" key="services">
				{services}
			</datalist>	);

		if(!this.state.hideClear){
			clearButton = <input type="button" style={{backgroundColor: "#70A7FD"}} value="Clear" onClick={this.handleClear}
			id="grayButton" hidden={this.state.hideClear} />
		}

		return(
			<div id="queryDiv">
				<form className="queryForm" id="queryForm" onSubmit={this._onSubmit}>

					Raw: <input type="checkbox" id="checkBox" onClick={this.handleCheckBox}></input>

					{datalists}

					<br />

					<input type="text" placeholder="url" ref="url" id="formbox" hidden={this.state.hideUrl} 
						onInput={this.handleUrl}/>

					<input type="text" list="services" placeholder="service" ref="service" 
					id="formbox" hidden={this.state.hideService} onInput={this.handleServiceChoice} />

					<input type="text" list={this.state.serviceChoice} placeholder="request type" ref="requestType" 
					id="formbox" hidden={this.state.hideRequestType} onInput={this.handleRequestTypeChoice}/>


					<input type="text" placeholder="securities" ref="securities" id="formbox" hidden={this.state.hideSecurities}  />

					<input type="text" placeholder="fields" ref="fields" id="formbox" hidden={this.state.hideFields}  />

					<input type="text" placeholder="start date" ref="startDate" id="formbox" hidden={this.state.hideStartDate}  />
			
					<input type="text" placeholder="end date" ref="endDate" id="formbox" hidden={this.state.hideEndDate}  />

					<input type="text" placeholder="periodicity" ref="period" id="formbox" hidden={this.state.hidePeriod}  />
				
					<textarea rows="4" cols="50" placeholder="Enter post body here." ref="textArea" 
						hidden={this.state.hideTextArea} />

					<br />

					<input type="submit" value="Submit" id="grayButton" hidden={this.state.hideSubmit} />

					{clearButton}

				</form>
			</div>
		);
	},
	
	_onSubmit: function(e){
		e.preventDefault();

		var service = this.refs.service.getDOMNode().value.trim();
		var requestType = this.refs.requestType.getDOMNode().value.trim();
		var securities = this.refs.securities.getDOMNode().value.trim();
		var fields = this.refs.fields.getDOMNode().value.trim();
		var startDate = this.refs.startDate.getDOMNode().value.trim();
		var endDate = this.refs.endDate.getDOMNode().value.trim();
		var period = this.refs.period.getDOMNode().value.trim();
		var textArea = this.refs.textArea.getDOMNode().value.trim();

		var cleanSecurities = [];
		var cleanFields = [];

		if (this.state.formFormat === "refData") {
			var url = 'http://localhost:3000/request?ns=blp' + '&service=' + service + '&type=' + requestType;
			if(!service){
				AppActions.handleError({
					type: "Missing service."});
			}else if (!requestType){
				AppActions.handleError({
					type: "Missing request type."});
			}else if (!securities){
				AppActions.handleError({
					type: "Missing securities."});
			}else if (!fields){
				AppActions.handleError({
					type: "Missing fields."});
			}else {
				securities = securities.split(",");
				fields = fields.split(",");

				securities.forEach(function (sec) {
					sec = sec.trim();
					cleanSecurities.push(sec);
				});
				fields.forEach(function (fld){
					fld = fld.trim();
					cleanFields.push(fld);
				})
				AppActions.submitQuery({
					postBody: {
						securities: cleanSecurities, 
						fields: cleanFields
					}, 
					url: url, 
					service: service, 
					requestType: requestType
					}
				);
				this.refs.startDate.getDOMNode().value = null;
				this.refs.endDate.getDOMNode().value = null;
				this.refs.period.getDOMNode().value = null;
				this.refs.url.getDOMNode().value = null;
				this.refs.textArea.getDOMNode().value = null;
			}
		}
		else if (this.state.formFormat === "hisData"){
			var url = 'http://localhost:3000/request?ns=blp' + '&service=' + service + '&type=' + requestType;
			if(!service){
				AppActions.handleError({
					type: "Missing service."});
			}else if (!requestType){
				AppActions.handleError({
					type: "Missing request type."});
			}else if (!securities){
				AppActions.handleError({
					type: "Missing securities."});
			}else if (!fields){
				AppActions.handleError({
					type: "Missing fields."});
			}else if (!startDate){
				AppActions.handleError({
					type: "Missing start date."});
			}else if (!endDate){
				AppActions.handleError({
					type: "Missing end date."});
			}else if (!period){
				AppActions.handleError({
					type: "Missing periodicity."});
			}
			else {
				securities = securities.split(",");
				fields = fields.split(",");

				securities.forEach(function (sec) {
					sec = sec.trim();
					cleanSecurities.push(sec);
				});
				fields.forEach(function (fld){
					fld = fld.trim();
					cleanFields.push(fld);
				})

				period = period.toUpperCase();

				AppActions.submitQuery({
					postBody: {
						securities: cleanSecurities, 
						fields: cleanFields, 
						startDate: startDate, 
						endDate: endDate, 
						periodicitySelection: period}, 
					url: url, 
					service: service, 
					requestType: requestType
					}
				);
				this.refs.url.getDOMNode().value = null;
				this.refs.textArea.getDOMNode().value = null;				
			}
		}
		else if (this.state.formFormat === "servTypeBody"){
			var url = null;
			if(!service){
				AppActions.handleError({
					type: "Missing service."});
			}else if (!requestType){
				AppActions.handleError({
					type: "Missing request type."});
			}else{
				url = 'http://localhost:3000/request?ns=blp' + '&service=' + service + '&type=' + requestType;
				if (!textArea){
				AppActions.handleError({
					type: "Missing POST body."});
				}else {
					try {
						JSON.parse(textArea);
					} catch (e) {
						AppActions.handleError({
							type: "This is not a valid JSON string."});
					}
					textArea = JSON.parse(textArea);

					AppActions.submitQuery({
						postBody: textArea, 
						url: url, 
						service: service, 
						requestType: requestType
						}
					);

					this.refs.securities.getDOMNode().value = null;
					this.refs.fields.getDOMNode().value = null;
					this.refs.startDate.getDOMNode().value = null;
					this.refs.endDate.getDOMNode().value = null;
					this.refs.period.getDOMNode().value = null;
					this.refs.url.getDOMNode().value = null;
				}
			}
		}
		else if (this.state.formFormat === "urlBody"){
			var url = null;
			if (this.refs.url.getDOMNode().value.trim()){
				url = this.refs.url.getDOMNode().value.trim();
				if (!textArea){
					AppActions.handleError({
						type: "Missing POST body."});
				}else {
					try {
						JSON.parse(textArea);
					} catch (e) {
						AppActions.handleError({
							type: "This is not a valid JSON string."});
					}
					textArea = JSON.parse(textArea);
					var typeIndex = url.indexOf("type=") + 5;
					requestType = url.substring(typeIndex);

					var serviceIndex = url.indexOf("service=") + 8;
					service = url.substring(serviceIndex, typeIndex - 6);

					AppActions.submitQuery({
						postBody: textArea, 
						url: url, 
						service: service, 
						requestType: requestType
						}
					);	

					this.refs.service.getDOMNode().value = null;
					this.refs.requestType.getDOMNode().value = null;
					this.refs.securities.getDOMNode().value = null;
					this.refs.fields.getDOMNode().value = null;
					this.refs.startDate.getDOMNode().value = null;
					this.refs.endDate.getDOMNode().value = null;
					this.refs.period.getDOMNode().value = null;				
				}
			}else 
			{
				AppActions.handleError({
					type: "Missing URL."});
			}
		}
		else {
			AppActions.handleError({
				type: "Please fill out form completely."});
		}
	}
});

module.exports = QueryForm;