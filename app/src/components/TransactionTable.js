import React, { PropTypes } from 'react';

const format = require('date-fns/format')

class TransactionTable extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.categorySelector = this.categorySelector.bind(this);
	}

	categorySelector(item, itemID){
		return (
			item.categories.map((cat, catID) => {
				return <span key={"ttcat-"+itemID+"-"+catID} onClick={() => this.props.onChoose({category:cat})}>{cat}&nbsp;</span>
			})
		);
	}

	render() {
		return (
			<table className="table table-hover table-sm">
				<thead className="table-active">
					<tr>
						<th scope="col">#</th>
						<th scope="col">Name</th>
						<th scope="col">Cost</th>
						<th scope="col">Date</th>
						<th scope="col">Categories</th>
					</tr>
				</thead>
				<tbody>
					{
						this.props.data.map((item, key) => {
							return (
								<tr key={key}>
									<th scope="row">{key+1}</th>
									<td onClick={() => this.props.onChoose({name:item.name})}>{item.name}</td>
									<td>${item.cost.toFixed(2)}</td>
									<td>{format(
										new Date(item.date_of),
										'MM/DD/YYYY'
									)}</td>
									<td>{this.categorySelector(item, key)}</td>
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