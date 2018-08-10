import React, { PropTypes } from 'react';
import { If, Then, Else } from 'react-if';
import Select from 'react-select';

import Save from 'react-feather/dist/icons/save';
import Edit from 'react-feather/dist/icons/edit';
import XCircle from 'react-feather/dist/icons/x-circle';

import moment from 'moment';
import DatePicker from 'react-datepicker';

var formatDate = require('date-fns/format');

//-- config
	import {select_css_overrides} from '~/config/react-select';

class WindowConfig extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			start: this.props.start,
			end: this.props.end,
			name: this.props.name ? this.props.name : "",
			include_categories: this.props.include_categories,
			exclude_categories: this.props.exclude_categories,
			output: this.props.output
		};
		this.types = [
			{
				value: "list",
				label: "List"
			},
			{
				value: "categories",
				label: "Categories"
			}
		];

		this.onChange = this.onChange.bind(this);
		this.onSave = this.onSave.bind(this);
		this.getCategories = this.getCategories.bind(this);
		this.getOutput = this.getOutput.bind(this);
	}

	getOutput(){
		return this.types.filter((v) => v.value == this.state.output)
	}

	getCategories(){
		let all_categories = [];

		all_categories = this.props.data
			.reduce((acc,cur) => acc.concat(cur.categories), []) //join all catgories
			.filter((v,k,me) => me.indexOf(v) === k) //uniqueify the list
			.reduce((acc,cur) => acc.concat([{value: cur, label: cur}]), []); //get it into the format we need

		return all_categories;
	}

	getSelected(which){
		let selected = [];

		if(this.state[which])
			selected = this.state[which].reduce((acc,cur) => acc.concat([{value: cur, label: cur}]), []);

		return selected;
	}

	onChange(new_value, target){
		let new_state = {};
			new_state[target] = new_value;

		//account for the format we get data back from react-select in
		if(target == 'include_categories' || target == 'exclude_categories')
			new_state[target] = new_value.reduce((acc,cur) => acc.concat([cur.value]), []);

		if(target == 'output')
			new_state[target] = new_value.value;

		this.setState(new_state);
	}

	onSave(){
		let new_query = {
			between: {
				start: this.state.start,
				end: this.state.end,
			},
			name: this.state.name,
			include_categories: this.state.include_categories,
			exclude_categories: this.state.exclude_categories
		};
		if(new_query.name == "") new_query.name = false;

		let new_output = this.state.output;


		this.props.updateQuery(new_query);
		this.props.switchOutput(new_output);
		this.props.cancelEdit();
	}

	render() {
		return (
			<div>
				<div className="d-flex flex-row-reverse">
					<span>
						<Save className="feather hover-okay" onClick={this.onSave} />
						<XCircle className="feather hover-not-okay" onClick={this.props.cancelEdit} style={{marginLeft: '5px'}} />
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
				<div className="form-group row">
					<label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">Includes:</label>
					<div className="col-sm-10">
						<Select
							isMulti={true}
							styles={select_css_overrides}
							options={this.getCategories()}
							onChange={(e) => this.onChange(e, 'include_categories')}
							value={this.getSelected('include_categories')}
						/>
					</div>
				</div>
				<div className="form-group row">
					<label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">Excludes:</label>
					<div className="col-sm-10">
						<Select
							isMulti={true}
							styles={select_css_overrides}
							options={this.getCategories()}
							onChange={(e) => this.onChange(e, 'exclude_categories')}
							value={this.getSelected('exclude_categories')}
						/>
					</div>
				</div>
				<div className="form-group row">
					<label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">Output:</label>
					<div className="col-sm-10">
						<Select
							styles={select_css_overrides}
							options={this.types}
							onChange={(e) => this.onChange(e, 'output')}
							value={this.getOutput()}
						/>
					</div>
				</div>
			</div>
		);
	}
}

// WindowConfig.propTypes = {};

export default WindowConfig;