import React, { PropTypes } from 'react';

class SideNav extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<nav className="col-md-2 d-none d-md-block bg-light sidebar"><div className="sidebar-sticky">
				{this.props.children}
			</div></nav>
		);
	}
}

// SideNav.propTypes = {};

export default SideNav;