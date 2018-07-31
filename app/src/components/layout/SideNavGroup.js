import React, { PropTypes } from 'react';

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
						<span className="d-flex align-items-center text-muted" style={{cursor: 'pointer'}} onClick={this.props.addAction}>
							<span data-feather={this.props.feather}></span>
						</span>
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
// 	feather: PropTypes.string,
// 	addAction: PropTypes.func
// };

SideNavGroup.defaultProps = {
	title: "Side Nav Group",
	feather: "plus-circle",
	addAction: () => {}
};

export default SideNavGroup;