import React, { PropTypes } from 'react';

class MainContent extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
				<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
					<h1 className="h2">{this.props.title}</h1>
					<div className="btn-toolbar mb-2 mb-md-0">
					<div className="btn-group mr-2">
						<button className="btn btn-sm btn-outline-secondary">Column</button>
						<button className="btn btn-sm btn-outline-secondary">Stack</button>
					</div>
					<button className="btn btn-sm btn-outline-secondary dropdown-toggle">
						<span data-feather="calendar"></span>
						This week
					</button>
					</div>
				</div>
				<div className="row">
					{this.props.children}
				</div>
			</main>
		);
	}
}

// MainContent.propTypes = {};

export default MainContent;