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
			servTypeChoice: "",
			reqTypeChoice: "",
			event: {},
			formFormat: ""
		};
	},
	componentWillReceiveProps: function(){
		this.setState({event: this.props.event})
		var event = this.state.event;
		if(Object.keys(event).length > 0){
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

				this.refs.securities.getDOMNode().value = "";
			    this.refs.fields.getDOMNode().value = "";
			    this.refs.startDate.getDOMNode().value = "";
			    this.refs.endDate.getDOMNode().value = "";
			    this.refs.period.getDOMNode().value = "";

			    this.refs.service.getDOMNode().value = event[2];
			    this.refs.type.getDOMNode().value = event[3];
			    this.refs.textArea.getDOMNode().value = JSON.stringify(event[0], null, 3);

			    this.setState({event: {}});
			    this.setState({formFormat: "servTypeBody"}, function(){
					this.handleServiceChoice();
					this.handleRequestChoice();
					this.setState({eventTextArea: this.refs.textArea.getDOMNode().value})
			    });
			});
		}
	},
	handleServiceChoice: function() {
		this.setState({servTypeChoice: this.refs.service.getDOMNode().value.toString()}, function(){
			var event = this.state.event;
			if (this.state.formFormat === "servTypeBody"){
				return;
			}
			else if (this.state.servTypeChoice != "")
			{	
				if(this.state.servTypeChoice === "refdata" || this.state.servTypeChoice === "apiflds" 
					|| this.state.servTypeChoice === "tasvc"|| this.state.servTypeChoice === "instruments"){
				    this.refs.securities.getDOMNode().value = "";
				    this.refs.fields.getDOMNode().value = "";
				    this.refs.startDate.getDOMNode().value = "";
				    this.refs.endDate.getDOMNode().value = "";
				    this.refs.period.getDOMNode().value = "";
				    this.refs.textArea.getDOMNode().value = "";

					this.setState({hideRequestType: false});

					this.setState({hideTextArea: true});
					this.setState({hideSubmit: true});
					this.setState({hideClear: true});

					return;					
				}
				else{
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

				    this.refs.securities.getDOMNode().value = "";
				    this.refs.fields.getDOMNode().value = "";
				    this.refs.startDate.getDOMNode().value = "";
				    this.refs.endDate.getDOMNode().value = "";
				    this.refs.period.getDOMNode().value = "";
				    this.refs.textArea.getDOMNode().value = "";
					return;
				}
			}
			else if (this.state.servTypeChoice === ""){
				this.refs.type.getDOMNode().value = "";
			    this.refs.securities.getDOMNode().value = "";
			    this.refs.fields.getDOMNode().value = "";
			    this.refs.startDate.getDOMNode().value = "";
			    this.refs.endDate.getDOMNode().value = "";
			    this.refs.period.getDOMNode().value = "";
			    this.refs.textArea.getDOMNode().value = "";

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
			else {
				return;
			}
		});
	},
	handleRequestChoice: function() {
		if (this.refs.type){
			this.setState({reqTypeChoice: this.refs.type.getDOMNode().value.toString()}, function(){
				if (this.state.formFormat === "servTypeBody"){
					return;
				}
				else if (this.state.reqTypeChoice != "")
				{
					this.setState({hideSecurities: true});
					this.setState({hideFields: true});
					this.setState({hideStartDate: true});
					this.setState({hideEndDate: true});
					this.setState({hidePeriod: true});
					this.setState({hideSubmit: true});
					this.setState({hideClear: true});

				    this.refs.securities.getDOMNode().value = "";
				    this.refs.fields.getDOMNode().value = "";
				    this.refs.startDate.getDOMNode().value = "";
				    this.refs.endDate.getDOMNode().value = "";
				    this.refs.period.getDOMNode().value = "";

				    this.refs.textArea.getDOMNode().value = "";
					if (this.state.reqTypeChoice === "ReferenceDataRequest") {
						this.setState({formFormat: "refData"});
						this.setState({hideSecurities: false});
						this.setState({hideFields: false});
						this.setState({hideSubmit: false});
						this.setState({hideClear: false});

						this.setState({hideTextArea: true});
					}
					else if (this.state.reqTypeChoice === "HistoricalDataRequest"){
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
				else if (this.state.reqTypeChoice === ""){
				    this.refs.securities.getDOMNode().value = "";
				    this.refs.fields.getDOMNode().value = "";
				    this.refs.startDate.getDOMNode().value = "";
				    this.refs.endDate.getDOMNode().value = "";
				    this.refs.period.getDOMNode().value = "";
				    this.refs.textArea.getDOMNode().value = "";

					this.setState({hideSecurities: true});
					this.setState({hideFields: true});
					this.setState({hideStartDate: true});
					this.setState({hideEndDate: true});
					this.setState({hidePeriod: true});
					this.setState({hideSubmit: true});
					this.setState({hideClear: true});

					this.setState({hideTextArea: true});
				}
				else {
					return;
				}
			});
			
		}
	},
	handleCheckBox: function() {
		var event = this.state.event;
		this.refs.securities.getDOMNode().value = "";
		this.refs.fields.getDOMNode().value = "";
		this.refs.startDate.getDOMNode().value = "";
		this.refs.endDate.getDOMNode().value = "";
		this.refs.period.getDOMNode().value = "";

		this.setState({hideSecurities: true});
		this.setState({hideFields: true});
		this.setState({hideStartDate: true});
		this.setState({hideEndDate: true});
		this.setState({hidePeriod: true});

		if (checkBox.checked){
			this.setState({formFormat: "urlBody"});
			this.setState({hideService: true});
			this.setState({hideRequestType:true});

			this.setState({hideUrl: false});
			this.setState({hideTextArea: false});
			this.setState({hideSubmit: false});
			this.setState({hideClear: false});
			if(this.state.servTypeChoice || this.state.reqTypeChoice){
				this.refs.url.getDOMNode().value = 'http://localhost:3000/request?ns=blp&service=' + this.state.servTypeChoice + '&type=' + this.state.reqTypeChoice;
			}else{
				this.refs.url.getDOMNode().value = "";
			}
		} else {
			this.setState({formFormat: "servTypeBody"});

			this.setState({hideUrl: true});

			this.setState({hideService: false});
			this.setState({hideRequestType: false});
			this.setState({hideTextArea: false});
			this.setState({hideSubmit: false});
			this.setState({hideClear: false});

			if (this.refs.url.getDOMNode().value && this.refs.url.getDOMNode().value.indexOf("http://localhost:3000/") != -1){
				var url = this.refs.url.getDOMNode().value;
				var typeIndex = url.indexOf("type=") + 5;
				this.refs.type.getDOMNode().value = url.substring(typeIndex);

				var serviceIndex = url.indexOf("service=") + 8;
				this.refs.service.getDOMNode().value = url.substring(serviceIndex, typeIndex - 6);

				this.handleServiceChoice();
				this.handleRequestChoice();
			}else if (!this.refs.url.getDOMNode().value){
				this.refs.service.getDOMNode().value = "";
				this.refs.type.getDOMNode().value = "";

				this.handleServiceChoice();
				this.handleRequestChoice();
			}
			else {
				this.refs.service.getDOMNode().value = this.state.servTypeChoice;
				this.refs.type.getDOMNode().value = this.state.reqTypeChoice;
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

		this.refs.service.getDOMNode().value = "";
		this.refs.type.getDOMNode().value = "";
		this.refs.securities.getDOMNode().value = "";
		this.refs.fields.getDOMNode().value = "";
		this.refs.startDate.getDOMNode().value = "";
		this.refs.endDate.getDOMNode().value = "";
		this.refs.period.getDOMNode().value = "";
		this.refs.url.getDOMNode().value = "";
		this.refs.textArea.getDOMNode().value = "";

		this.setState({servTypeChoice: ""});
		this.setState({reqTypeChoice: ""});

		this.setState({formFormat: ""});
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
			<datalist id="services" key="">
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

					<input type="text" list={this.state.servTypeChoice} placeholder="request type" ref="type" 
					id="formbox" hidden={this.state.hideRequestType} onInput={this.handleRequestChoice}/>


					<input type="text" placeholder="securities" ref="securities" id="formbox" hidden={this.state.hideSecurities}  />

					<input type="text" placeholder="fields" ref="fields" id="formbox" hidden={this.state.hideFields}  />

					<input type="text" placeholder="start date" ref="startDate" id="formbox" hidden={this.state.hideStartDate}  />
			
					<input type="text" placeholder="end date" ref="endDate" id="formbox" hidden={this.state.hideEndDate}  />

					<input type="text" placeholder="periodicity" ref="period" id="formbox" hidden={this.state.hidePeriod}  />
				
					<textarea rows="4" cols="50" placeholder="Enter post body here." ref="textArea" 
						hidden={this.state.hideTextArea} onInput={this.handleTextArea} />

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
		var type = this.refs.type.getDOMNode().value.trim();
		var securities = this.refs.securities.getDOMNode().value.trim();
		var fields = this.refs.fields.getDOMNode().value.trim();
		var startDate = this.refs.startDate.getDOMNode().value.trim();
		var endDate = this.refs.endDate.getDOMNode().value.trim();
		var period = this.refs.period.getDOMNode().value.trim();
		var textArea = this.refs.textArea.getDOMNode().value.trim();

		var cleanSecurities = [];
		var cleanFields = [];

		if (this.state.formFormat === "refData") {
			var url = 'http://localhost:3000/request?ns=blp' + '&service=' + service + '&type=' + type;
			if(!service){
				AppActions.handleError(["Missing service.", "undefined"]);
			}else if (!type){
				AppActions.handleError(["Missing request type.", "undefined"]);
			}else if (!securities){
				AppActions.handleError(["Missing securities.", url]);
			}else if (!fields){
				AppActions.handleError(["Missing fields.", url]);
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
				AppActions.submitQuery([{securities: cleanSecurities, fields: cleanFields}, url, service, type]);

				this.refs.startDate.getDOMNode().value = "";
				this.refs.endDate.getDOMNode().value = "";
				this.refs.period.getDOMNode().value = "";
				this.refs.url.getDOMNode().value = "";
				this.refs.textArea.getDOMNode().value = "";
			}
		}
		else if (this.state.formFormat === "hisData"){
			var url = 'http://localhost:3000/request?ns=blp' + '&service=' + service + '&type=' + type;
			if(!service){
				AppActions.handleError(["Missing service.", "undefined"]);
			}else if (!type){
				AppActions.handleError(["Missing request type.", "undefined"]);
			}else if (!securities){
				AppActions.handleError(["Missing securities.", url]);
			}else if (!fields){
				AppActions.handleError(["Missing fields.", url]);
			}else if (!startDate){
				AppActions.handleError(["Missing start date.", url]);
			}else if (!endDate){
				AppActions.handleError(["Missing end date.", url]);
			}else if (!period){
				AppActions.handleError(["Missing period.", url]);
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

				AppActions.submitQuery([{securities: cleanSecurities, fields: cleanFields, 
					startDate: startDate, endDate: endDate, "periodicitySelection": period}, url, service, type]);

				this.refs.url.getDOMNode().value = "";
				this.refs.textArea.getDOMNode().value = "";				
			}
		}
		else if (this.state.formFormat === "servTypeBody"){
			var url = "";
			if(!service){
				AppActions.handleError(["Missing service.", "undefined"]);
			}else if (!type){
				AppActions.handleError(["Missing request type.", "undefined"]);
			}else{
				url = 'http://localhost:3000/request?ns=blp' + '&service=' + service + '&type=' + type;
				if (!textArea){
					AppActions.handleError(["Missing POST body.", url]);
				}else {
					try {
						JSON.parse(textArea);
					} catch (e) {
						AppActions.handleError(["This is not a valid JSON string.", url]);
					}
					textArea = JSON.parse(textArea);

					AppActions.submitQuery([textArea, url, service, type]);

					this.refs.securities.getDOMNode().value = "";
					this.refs.fields.getDOMNode().value = "";
					this.refs.startDate.getDOMNode().value = "";
					this.refs.endDate.getDOMNode().value = "";
					this.refs.period.getDOMNode().value = "";
					this.refs.url.getDOMNode().value = "";
				}
			}
		}
		else if (this.state.formFormat === "urlBody"){
			var url = "";
			if (this.refs.url.getDOMNode().value.trim()){
				url = this.refs.url.getDOMNode().value.trim();
				if (!textArea){
					AppActions.handleError(["Missing POST body.", url]);
				}else {
					try {
						JSON.parse(textArea);
					} catch (e) {
						AppActions.handleError(["This is not a valid JSON string.", url]);
					}
					textArea = JSON.parse(textArea);
					var typeIndex = url.indexOf("type=") + 5;
					type = url.substring(typeIndex);

					var serviceIndex = url.indexOf("service=") + 8;
					service = url.substring(serviceIndex, typeIndex - 6);

					AppActions.submitQuery([textArea, url, service, type]);	

					this.refs.service.getDOMNode().value = "";
					this.refs.type.getDOMNode().value = "";
					this.refs.securities.getDOMNode().value = "";
					this.refs.fields.getDOMNode().value = "";
					this.refs.startDate.getDOMNode().value = "";
					this.refs.endDate.getDOMNode().value = "";
					this.refs.period.getDOMNode().value = "";				
				}
			}else 
			{
				AppActions.handleError(["Missing URL.", "undefined"]);
			}
		}
		else {
			AppActions.handleError(["Undefined form format.", "undefined"]);
		}
	}
});

module.exports = QueryForm;