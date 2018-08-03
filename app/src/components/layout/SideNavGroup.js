import React, { PropTypes } from 'react';
import PlusCircle from 'react-feather/dist/icons/plus-circle';

class SideNavGroup extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div style={{"display": "inline"}}>
				{this.props.title ?
					<h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
						<span>{this.props.title}</span>
						{this.props.actionButtons}
					</h6>
				: '' }
				<ul className="nav flex-column">
					{this.props.children}
				</ul>
			</div>
		);
	}
}

// SideNavGroup.propTypes = {
// 	title: PropTypes.string,
// 	actionButtons: PropTypes.string,
// 	addAction: PropTypes.func
// };

SideNavGroup.defaultProps = {
	title: "Side Nav Group",
	actionButtons: <span />,
	addAction: () => {}
};

export default SideNavGroup;