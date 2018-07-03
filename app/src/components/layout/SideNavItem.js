import React, { PropTypes } from 'react';

class SideNavGroup extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<li className="nav-item">
				<a className="nav-link" href={this.props.href} onClick={this.props.action}>
				<span data-feather={this.props.feather}></span>
				{this.props.children}
				</a>
			</li>
		);
	}
}

// SideNavGroup.propTypes = {};

export default SideNavGroup;