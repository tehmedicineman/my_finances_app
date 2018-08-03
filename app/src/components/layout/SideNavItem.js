import React, { PropTypes } from 'react';

class SideNavItem extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<li className="nav-item">
				<MaybeLink href={this.props.href} action={this.props.action}>
					<span data-feather={this.props.feather}></span>
					{this.props.children}
				</MaybeLink>
			</li>
		);
	}
}

const MaybeLink = function(props){
	if(props.href){
		return <a className="nav-link" href={props.href} onClick={props.action}>{props.children}</a>;
	}

	return <span className="nav-link" onClick={props.action ? props.action : () => {}} style={props.action ? {cursor: 'pointer'} : {}}>{props.children}</span>;
}

// SideNavItem.propTypes = {};

SideNavItem.defaultProps = {
	href: false,
	action: false
};

export default SideNavItem;