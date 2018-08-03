import React, { PropTypes } from 'react';

class MainContent extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
				{this.props.children}
			</main>
		);
	}
}

// MainContent.propTypes = {};

export default MainContent;