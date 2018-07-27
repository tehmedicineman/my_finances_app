import React, { PropTypes } from 'react';
import moment from 'moment';
const $ = require('jquery');

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import '~/css/datepicker.css';

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

		this.date_format = "YYYY-MM-DD";

		this.handleChange = this.handleChange.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}

	componentDidMount(){
		/* Need to add a hook onto the bootstrap-modal to update our main state so we can toggle the elements existence */
			$('#kjalsdkjalsdjalsdkj').on('hide.bs.modal',() => {
				this.props.modalClose();
			});
	}

	handleChange(new_date, which){
		let update = {};
			update[which] = new_date.format(this.date_format);
		this.setState(update);
	}

	handleSave(){
		let new_query = {
			between: {
				start: this.state.start,
				end: this.state.end
			}
		}
		this.props.action(new_query);
	}

	render() {
		return (
			<div className="modal" tabIndex="-1" role="dialog" id={this.props.modalId}>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{this.props.title}</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<DatePicker
							selected={moment(this.state.start, "YYYY-MM-DD")}
							onChange={(v) => this.handleChange(v,'start')}
							className="datepicker-input"
						/>
						<DatePicker
							selected={moment(this.state.end, "YYYY-MM-DD")}
							onChange={(v) => this.handleChange(v,'end')}
							className="datepicker-input"
						/>
					</div>
					<div className="modal-footer">
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