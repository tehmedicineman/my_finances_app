import React, { PropTypes } from 'react';

import SideNavItem from './layout/SideNavItem';

var formatDate = require('date-fns/format');
var subMonths = require('date-fns/sub_months');
var endOfMonth = require('date-fns/end_of_month');
var startOfMonth = require('date-fns/start_of_month');
var endOfDay = require('date-fns/end_of_day');
var startOfDay = require('date-fns/start_of_day');

class FilterMonths extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.date_format = "YYYY-MM-DD";
		this.month_format = "MMMM";
		this.month_display = "MMMM YYYY";

		this.pastSixMonths = this.pastSixMonths.bind(this);
		this.renderItem = this.renderItem.bind(this);
	}

	pastSixMonths(){
		let current = startOfMonth(new Date());
		return (
			<ul className="nav flex-column">
				{this.renderItem(current)}
				{this.renderItem(subMonths(current,1))}
				{this.renderItem(subMonths(current,2))}
				{this.renderItem(subMonths(current,3))}
				{this.renderItem(subMonths(current,4))}
				{this.renderItem(subMonths(current,5))}
			</ul>
		);
	}

	renderItem(current){
		return <SideNavItem feather="layers" href="#" action={() => this.props.filter(formatDate(current,this.date_format), formatDate(endOfMonth(current),this.date_format),formatDate(current,this.month_display))}>{formatDate(endOfMonth(current),this.month_format)}</SideNavItem>
	}

	render() {
		return (
			<div style={{"display": "inline"}}>
				<h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
					<span>Filter By Months</span>
					<a className="d-flex align-items-center text-muted" href="#">
					<span data-feather="plus-circle" data-toggle="modal" data-target="#exampleModal"></span>
					</a>
				</h6>
				{this.pastSixMonths()}
			</div>
		);
	}
}

// FilterMonths.propTypes = {};

export default FilterMonths;