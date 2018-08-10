import React, { PropTypes } from 'react';

import ChevRight from 'react-feather/dist/icons/chevrons-right';

class TransactionTable extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.getCategories = this.getCategories.bind(this);
		this.getTotal = this.getTotal.bind(this);
	}
	
	getTotal(entries){
		let total = 0;

		if(entries.length > 0){
			let just_costs = entries.map(item => math.floor(item.cost*100));
			console.log(333,...just_costs);
			total = math.add(0, ...just_costs) / 100;
		}

		return total;
	}

	getCategories(){
		let qualifier = 'separate';
		let key = 'categories';
		let results = [];

		let byGroup = this.props.data.reduce((acc, val) => {
			if(qualifier === 'all'){
				var cat = val[key].join('|');
				if(typeof acc[cat] === 'undefined') acc[cat] = [];
				acc[cat].push(val);
			}else{
				val[key].forEach((cat) => {
					if(typeof acc[cat] === 'undefined') acc[cat] = [];
					acc[cat].push(val);
				})
			}
			return acc;
		},{});

		for(var cat in byGroup){
			let category = {category: cat, entries: byGroup[cat]};
			results.push(category);
		}

		return results
	}

	render() {
		return (
			<table className="table table-hover table-sm">
				<thead className="table-active">
					<tr>
						<th scope="col">Category</th>
						<th scope="col">Count</th>
						<th scope="col">Total</th>
						<th scope="col">View</th>
					</tr>
				</thead>
				<tbody>
					{
						this.getCategories().map((item, key) => {
							return (
								<tr key={key}>
									<td>{item.category}</td>
									<td>{item.entries.length}</td>
									<td>${this.getTotal(item.entries)}</td>
									<td><ChevRight /></td>
								</tr>
							);
						})
					}
				</tbody>
			</table>
		);
	}
}

// TransactionTable.propTypes = {};

export default TransactionTable;