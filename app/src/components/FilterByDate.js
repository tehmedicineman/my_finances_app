import React, { PropTypes } from 'react';
import { If, Then, Else } from 'react-if';

import SideNavItem from './layout/SideNavItem';
import SideNavGroup from './layout/SideNavGroup';

var formatDate = require('date-fns/format');
var startOfMonth = require('date-fns/start_of_month');

class FilterByDate extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.date_format = "YYYY-MM-DD";
		this.date_display = "MMMM Do, YYYY";

		this.currentFilter = this.currentFilter.bind(this);
	}

	currentFilter(){
		let current = startOfMonth(new Date());
		return (
			<ul className="nav flex-column">
				<If condition={this.props.start !== false && this.props.end !== false}>
					<Then>{() => <span> 
						<SideNavItem feather="layers" href="#" action={() => this.props.filter(query)}><b>Start:</b> {formatDate(this.props.start,this.date_display)}</SideNavItem>
						<SideNavItem feather="layers" href="#" action={() => this.props.filter(query)}><b>End:</b> {formatDate(this.props.end,this.date_display)}</SideNavItem>
					</span>}</Then>
				</If>
			</ul>
		);
	}

	render() {
		return (
			<SideNavGroup title="Filter By Date" modalId={this.props.modalId} addAction={this.props.addAction}>
				{this.currentFilter()}
			</SideNavGroup>
		);
	}
}

// FilterByDate.propTypes = {};

export default FilterByDate;