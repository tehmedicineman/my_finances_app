import React, { PropTypes } from 'react';

class PageBody extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div className="row">
				{this.props.children}
			</div>
		);
	}
}

// PageBody.propTypes = {};

export default PageBody;



