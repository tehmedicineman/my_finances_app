import React, { PropTypes } from 'react';
import moment from 'moment';
const $ = require('jquery');

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import '~/css/datepicker.css';

//-- config
import {date_format} from '~/config/dates';

/* Comments
	This element initally loads in the start/end time as props then uses its own personal state so it can change the inputs.
	We need to kill/rebuild this element every time we open the modal, otherwise the start/end times don't get updated from the base of false/false.
	Because of this we need to hook into the bootstrap-modal stuff directly here.
*/

class ChangeFiltersModal extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			start: this.props.query.between.start,
			end: this.props.query.between.end
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.clearDates = this.clearDates.bind(this);
	}

	componentDidMount(){
		/* Need to add a hook onto the bootstrap-modal to update our main state so we can toggle the elements existence */
			$('#kjalsdkjalsdjalsdkj').on('hide.bs.modal',() => {
				this.props.onClose();
			});
	}

	handleChange(new_date, which){
		let update = {};
			update[which] = new_date.format(date_format);
		this.setState(update);
	}

	handleSave(){
		let new_query = {
			between: {
				start: this.state.start,
				end: this.state.end
			}
		}
		this.props.action(new_query, this.props.modal_id);
	}

	clearDates(){
		let new_query = {
			between: {
				start: false,
				end: false
			}
		}
		this.props.action(new_query, this.props.modal_id);
	}

	render() {
		return (
			<div className="modal" tabIndex="-1" role="dialog" id={this.props.modal_id}>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{this.props.title}</h5>
						<button type="button" className="close" onClick={() => this.props.modalClose(this.props.modal_id)} aria-label="Close">
						<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<div className="form-group">
							<label htmlFor="startDateInput">Start Date</label>
							<DatePicker
								id="startDateInput"
								selected={moment(this.state.start, "YYYY-MM-DD")}
								onChange={(v) => this.handleChange(v,'start')}
								className="datepicker-input"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="endDateInput">End Date</label>
							<DatePicker
								id="endDateInput"
								selected={moment(this.state.end, "YYYY-MM-DD")}
								onChange={(v) => this.handleChange(v,'end')}
								className="datepicker-input"
							/>
						</div>
						
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary btn-sm" onClick={this.clearDates}>Clear</button>
						<button type="button" className="btn btn-primary" onClick={this.handleSave}>{this.props.actionPhrase}</button>
					</div>
					</div>
				</div>
			</div>
		);
	}
}

// ChangeFiltersModal.propTypes = {};

export default ChangeFiltersModal;