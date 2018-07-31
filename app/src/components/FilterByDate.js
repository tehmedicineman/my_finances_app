import React, { PropTypes } from 'react';
import { If, Then, Else } from 'react-if';

import SideNavItem from './layout/SideNavItem';
import SideNavGroup from './layout/SideNavGroup';

var formatDate = require('date-fns/format');

//-- config
	import {date_display} from '~/config/dates';

class FilterByDate extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.currentFilter = this.currentFilter.bind(this);
	}

	currentFilter(){
		return (
			<ul className="nav flex-column">
				<If condition={this.props.start !== false && this.props.end !== false}>
					<Then>{() => <span> 
						<SideNavItem feather="layers" href="#"><b>Start:</b> {formatDate(this.props.start,date_display)}</SideNavItem>
						<SideNavItem feather="layers" href="#"><b>End:</b> {formatDate(this.props.end,date_display)}</SideNavItem>
					</span>}</Then>
				</If>
			</ul>
		);
	}

	render() {
		return (
			<SideNavGroup title="Filter By Date" modal_id={this.props.modal_id} addAction={this.props.addAction} feather="edit">
				{this.currentFilter()}
			</SideNavGroup>
		);
	}
}

// FilterByDate.propTypes = {};

export default FilterByDate;