import React, { PropTypes } from 'react';
import { If, Then, Else } from 'react-if';

import Save from 'react-feather/dist/icons/save';
import Edit from 'react-feather/dist/icons/edit';
import XCircle from 'react-feather/dist/icons/x-circle';

import moment from 'moment';
import DatePicker from 'react-datepicker';

var formatDate = require('date-fns/format');

//-- config
	import {date_display} from '~/config/dates';

class WindowConfig extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			start: this.props.start,
			end: this.props.end,
			name: this.props.name ? this.props.name : ""
		}

		this.onChange = this.onChange.bind(this);
		this.onSave = this.onSave.bind(this);
	}

	onChange(new_value, target){
		let new_state = {};
			new_state[target] = new_value;
		this.setState(new_state);
	}

	onSave(){
		let new_query = {
			between: {
				start: this.state.start,
				end: this.state.end,
			},
			name: this.state.name,
		};
		if(new_query.name == "") new_query.name = false;


		this.props.updateQuery(new_query);
		this.props.cancelEdit();
	}

	render() {
		return (
			<div>
				<div className="d-flex flex-row-reverse">
					<span>
						<Save className="feather hover-okay" onClick={this.onSave} />
						<XCircle className="feather hover-not-okay" onClick={this.props.cancelEdit} />
					</span>
				</div>
				<div className="form-group row">
					<label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">Start:</label>
					<div className="col-sm-10">
						<DatePicker
							id="startDateInput"
							selected={moment(this.state.start)}
							onChange={(v) => this.onChange(v.toDate(),'start')}
							className="datepicker-input form-control form-control-sm"
						/>
					</div>
				</div>
				<div className="form-group row">
					<label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">End:</label>
					<div className="col-sm-10">
						<DatePicker
							id="startDateInput"
							selected={moment(this.state.end)}
							onChange={(v) => this.onChange(v.toDate(),'end')}
							className="datepicker-input form-control form-control-sm"
						/>
					</div>
				</div>
				<div className="form-group row">
					<label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">Name:</label>
					<div className="col-sm-10">
						<input
							type="text"
							className="datepicker-input form-control form-control-sm"
							style={{width: "166px"}}
							value={this.state.name}
							onChange={(e) => this.onChange(e.target.value,'name')}
						/>
					</div>
				</div>
			</div>
		);
	}
}

// WindowConfig.propTypes = {};

export default WindowConfig;