import React, { PropTypes } from 'react';
import {UnmountClosed} from 'react-collapse';

import Save from 'react-feather/dist/icons/save';
import Edit from 'react-feather/dist/icons/edit';
import XCircle from 'react-feather/dist/icons/x-circle';

//-- components
	import TransactionTable from '~/components/TransactionTable';
	import WindowConfig from '~/components/WindowConfig';

//-- libraries
	var formatDate = require('date-fns/format');
	var startOfMonth = require('date-fns/start_of_month');
	var endOfMonth = require('date-fns/end_of_month');
	var subMonths = require('date-fns/sub_months');
	var addMonths = require('date-fns/add_months');

class WindowPane extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			query: {
				name: false,
				between: {
					start: startOfMonth(subMonths(new Date(),1)),
					end: endOfMonth(subMonths(new Date(),1))
				},
				include_categories: false,
				exclude_categories: false
			},
			total: 0,
			output: "list",
			editing: false
		};

		this.findView = this.findView.bind(this);
		this.findConfig = this.findConfig.bind(this);
		this.updateQuery = this.updateQuery.bind(this);
		this.getTotal = this.getTotal.bind(this);
		this.getTitle = this.getTitle.bind(this);

		this.cancelEdit = this.cancelEdit.bind(this);
		this.startEdit = this.startEdit.bind(this);
	}

	getTotal(){
		let data = this.props.db.GetByQuery(this.state.query);
		let total = 0;

		if(data.length > 0){
			let just_costs = data.map(item => math.floor(item.cost*100));
			total = math.add(...just_costs) / 100;
		}

		return total;
	}

	getTitle(){
		let startMonth = formatDate(this.state.query.between.start,"MMMM");
		let endMonth = formatDate(this.state.query.between.end,"MMMM");
	
		let title = startMonth;

		if(endMonth != startMonth)
			title += " - " + endMonth;

		title = <span title="Search: Date">{title}</span>;

		let name = "";
		if(this.state.query.name !== "" && this.state.query.name !== false){
			console.log(this.state.query.name);
			name = <span style={{fontSize: '0.8em', opacity: '.8', marginLeft: '5px'}} title="Search: Name">({this.state.query.name})</span>;
		}

		return <span>{title}{name}</span>;
	}

	findView(){
		let response;

		switch(this.state.output){
			case "list":
				response = <TransactionTable data={this.props.db.GetByQuery(this.state.query)} />;
				break;
			default:
				response = <div>Whoops, look like your config is a bit goofy!</div>;
		}

		return response;
	}

	findConfig(){
		let response;

		switch(this.state.output){
			case "list":
				response = (
					<WindowConfig
						start={this.state.query.between.start}
						end={this.state.query.between.end}
						name={this.state.query.name}
						updateQuery={this.updateQuery}
					/>
				);
				break;
			default:
				response = <div>Whoops, look like your config is a bit goofy!</div>;
		}

		return response;
	}

	updateQuery(params){
		let new_params = Object.assign({},this.state.query,params);
		this.setState({query: new_params});
	}

	cancelEdit(){
		this.setState({editing: false});
	}

	startEdit(){
		this.setState({editing: true});
	}

	render() {
		return (
			<div className="col">
				<UnmountClosed isOpened={this.state.editing} forceInitialAnimation={true}>
					<WindowConfig
						start={this.state.query.between.start}
						end={this.state.query.between.end}
						name={this.state.query.name}
						updateQuery={this.updateQuery}
						cancelEdit={this.cancelEdit}
						editing={this.state.editing}
					/>
				</UnmountClosed>
				<div className="h4 d-flex justify-content-between align-items-center">
					<span>{this.getTitle()} <span style={{"fontSize": ".6em", "opacity": ".6"}} title="Filtered Total">(${this.getTotal()})</span></span>
					{!this.state.editing ? <span><Edit className="feather hover-okay" onClick={this.startEdit} /></span> : '' }
				</div>
				{this.findView()}
			</div>
		);
	}
}

// WindowPane.propTypes = {};

export default WindowPane;



