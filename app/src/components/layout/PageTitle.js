import React, { PropTypes } from 'react';

var startOfMonth = require('date-fns/start_of_month');
var endOfMonth = require('date-fns/end_of_month');
var subWeeks = require('date-fns/sub_weeks');
var addWeeks = require('date-fns/add_weeks');
var subMonths = require('date-fns/sub_months');
var addMonths = require('date-fns/add_months');
var subYears = require('date-fns/sub_years');
var addYears = require('date-fns/add_years');

class PageTitle extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	handleAction(frame, value){
		let start = this.props.query.between.start;
		let end = this.props.query.between.end;
		switch(frame){
			case "week":
				if(value > 0){
					start = addWeeks(start,1);
					end = addWeeks(end,1);
				}else{
					start = subWeeks(start,1);
					end = subWeeks(end,1);
				}
				break;
			case "month":
				if(value > 0){
					start = addMonths(start,1);
					end = addMonths(end,1);
				}else{
					start = subMonths(start,1);
					end = subMonths(end,1);
				}
				break;
			case "year":
			if(value > 0){
				start = addYears(start,1);
				end = addYears(end,1);
			}else{
				start = subYears(start,1);
				end = subYears(end,1);
			}
				break;
		}

		this.props.action({between: {start, end}});
	}

	render() {
		return (
			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
				<h1 className="h2">{this.props.title}</h1>
				<div className="btn-toolbar mb-2 mb-md-0">
				<button className="btn btn-sm btn-outline-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Alter Filter
				</button>
				<div className="dropdown-menu dropdown-menu-right">
					<span className="dropdown-item" onClick={this.props.addWindow}>Add Window</span>
					
					{this.props.windows.length > 1 ? <div className="dropdown-divider"></div> : '' }
					{this.props.windows.length > 1 ?
						this.props.windows.map((v,k) => {
							return <span className="dropdown-item" key={"remove_window-"+k} onClick={() => this.props.removeWindow(k)}>Remove #{k+1}</span>
						})
						: ''
					}
					<div className="dropdown-divider"></div>
					<span className="dropdown-item" onClick={() => this.handleAction('week',1)}>+1 Week</span>
					<span className="dropdown-item" onClick={() => this.handleAction('month',1)}>+1 Month</span>
					<span className="dropdown-item" onClick={() => this.handleAction('year',1)}>+1 Year</span>
					<div className="dropdown-divider"></div>
					<span className="dropdown-item" onClick={() => this.handleAction('week',-1)}>-1 Week</span>
					<span className="dropdown-item" onClick={() => this.handleAction('month',-1)}>-1 Month</span>
					<span className="dropdown-item" onClick={() => this.handleAction('year',-1)}>-1 Year</span>
				</div>
			</div>
			</div>
		);
	}
}

// PageTitle.propTypes = {};

export default PageTitle;

