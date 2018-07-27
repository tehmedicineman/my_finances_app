import React, { PropTypes } from 'react';

import MainSection from './layout/MainSection';
import TransactionTable from './TransactionTable';
require('mathjs');

class TranasctionListSection extends React.Component {
	constructor(props, context) {
		super(props, context);
		
		this.state = {
			current_data: this.props.list,
			current_total: 0
		};

		this.findTotal = this.findTotal.bind(this);
	}

	findTotal(stuff){
		let total = 0;
		if(stuff.length > 0){
			let just_costs = stuff.map(item => math.floor(item.cost*100));
			total = math.add(...just_costs) / 100;
		}
		return total;
	}

	componentDidMount(){
		this.findTotal(this.props.list);
	}
	
	render() {
		return (
			<MainSection className="col">
				<div className="h4">{this.props.title} <span style={{"fontSize": ".7em", "opacity": ".7"}}>(${this.findTotal(this.props.list)})</span></div>
				<TransactionTable data={this.props.list} onChoose={this.props.onChoose} />
			</MainSection>
		);
	}
}
//col-12 col-sm-6
// TranasctionListSection.propTypes = {};

export default TranasctionListSection;