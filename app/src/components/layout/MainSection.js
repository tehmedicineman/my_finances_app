import React, { PropTypes } from 'react';

class MainSection extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div className={this.props.className}>
				{this.props.children}
			</div>
		);
	}
}

// MainSection.propTypes = {};

export default MainSection;