import React, { PropTypes } from 'react';

import SideNavGroup from './layout/SideNavGroup';
import SideNavItem from './layout/SideNavItem';

var formatDate = require('date-fns/format');
var subMonths = require('date-fns/sub_months');
var endOfMonth = require('date-fns/end_of_month');
var startOfMonth = require('date-fns/start_of_month');

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
		let query = {
			between: {
				start: formatDate(current,this.date_format),
				end: formatDate(endOfMonth(current),this.date_format), 
			}
		};
		//formatDate(current,this.month_display)
		return <SideNavItem feather="layers" href="#" action={() => this.props.filter(query)}>{formatDate(endOfMonth(current),this.month_format)}</SideNavItem>
	}

	render() {
		return (
			<SideNavGroup title="Filter By Month" modalId={this.props.modalId}>
				{this.pastSixMonths()}
			</SideNavGroup>
		);
	}
}

// FilterMonths.propTypes = {};

export default FilterMonths;