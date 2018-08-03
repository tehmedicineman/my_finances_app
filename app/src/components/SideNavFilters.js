import React, { PropTypes } from 'react';
import { If, Then, Else } from 'react-if';

import Save from 'react-feather/dist/icons/save';
import Edit from 'react-feather/dist/icons/edit';
import XCircle from 'react-feather/dist/icons/x-circle';

import moment from 'moment';
import DatePicker from 'react-datepicker';

import SideNavItem from './layout/SideNavItem';
import SideNavGroup from './layout/SideNavGroup';

var formatDate = require('date-fns/format');

//-- config
	import {date_display} from '~/config/dates';

class SideNavFilters extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			editing: false,
			start: this.props.start,
			end: this.props.end,
			name: this.props.name ? this.props.name : ""
		}

		this.dateFilter = this.dateFilter.bind(this);
		this.nameFilter = this.nameFilter.bind(this);
		this.startEditing = this.startEditing.bind(this);
		this.cancelEditing = this.cancelEditing.bind(this);
		this.saveEditing = this.saveEditing.bind(this);
	}
	
	startEditing(){
		this.setState({
			editing: true,
			start: this.props.start,
			end: this.props.end,
			name: this.props.name ? this.props.name : ""
		});
	}
	
	saveEditing(){
		console.log('still gotta make that there save');
		let new_query = {
			between: {
				start: this.state.start,
				end: this.state.end,
			},
			name: this.state.name,
		};
		if(new_query.name == "") new_query.name = false;
		
		this.props.updateQuery(new_query);
		this.setState({editing: false});
	}
	
	cancelEditing(){
		this.setState({
			editing: false
		});
	}

	dateFilter(){
		return (
			<ul className="nav flex-column">
				<SideNavItem feather="layers"><b>Start:</b> {this.state.editing ?
					<span style={{display: 'inline-block'}}>
						<DatePicker
							id="startDateInput"
							selected={moment(this.state.start)}
							onChange={(v) => this.onChange(v,'start')}
							className="datepicker-input"
						/>
					</span>
					: formatDate(this.props.start,date_display)}</SideNavItem>
				<SideNavItem feather="layers"><b>End:</b> {this.state.editing ?
					<span style={{display: 'inline-block'}}>
						<DatePicker
							id="startDateInput"
							selected={moment(this.state.end)}
							onChange={(v) => this.onChange(v,'end')}
							className="datepicker-input"
						/>
					</span>
					: formatDate(this.props.end,date_display)}</SideNavItem>
			</ul>
		);
	}

	onChange(new_value, target){
		let new_state = {};
			new_state[target] = new_value;
		this.setState(new_state);
	}

//-- render functions

	nameFilter(){
		return (
			<ul className="nav flex-column">
				<SideNavItem feather="layers"><b>Name:</b> {this.state.editing ? 
					<input
						type="text"
						value={this.state.name}
						onChange={(e) => this.onChange(e.target.value,'name')}
					/>
					: this.props.name
				}</SideNavItem>
			</ul>
		);
	}

	actionButtons(){
		if(this.state.editing){
			return (
				<span className="d-flex">
					<span className="d-flex align-items-center text-muted feather hover-okay" style={{cursor: 'pointer', marginRight: "5px"}} onClick={this.saveEditing}>
						<Save />
					</span>
					<span className="d-flex align-items-center text-muted feather hover-not-okay" style={{cursor: 'pointer'}} onClick={this.cancelEditing}>
						<XCircle />
					</span>
				</span>
			);
		}else{
			return (
				<span className="d-flex align-items-center text-muted feather hover-okay" style={{cursor: 'pointer'}} onClick={this.startEditing}>
					<Edit />
				</span>
			);
		} 
	}

	render() {
		return (
			<SideNavGroup title="Filters" modal_id={this.props.modal_id} addAction={this.startEditing} actionButtons={this.actionButtons()}>
				{this.dateFilter()}
				{this.nameFilter()}
			</SideNavGroup>
		);
	}
}

// SideNavFilters.propTypes = {};

export default SideNavFilters;