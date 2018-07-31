import React, { PropTypes } from 'react';

//-- libraries and such
	const $ = require('jquery');
	require('bootstrap');
	require('mathjs');
	const feather = require('feather-icons');
	const financesAPI = require('../api/finances');
	import ldb from '../libraries/LDB';
	import {modal_id, OpenModal, CloseModal} from '~/helpers/Modal';

//-- components
	import SideNav from './layout/SideNav';
	import SideNavGroup from './layout/SideNavGroup';
	import SideNavItem from './layout/SideNavItem';
	import MainContent from './layout/MainContent';
	import ChangeFiltersModal from '~/components/modals/ChangeFiltersModal';
	import FilterByDate from './FilterByDate';
	import TranasctionListSection from './TranasctionListSection';

//-- libraries
	// import DataGroupifier from './libraries/DataGroupifier.js'
	var formatDate = require('date-fns/format');
	var startOfMonth = require('date-fns/start_of_month');
	var endOfMonth = require('date-fns/end_of_month');

//-- config
	import {date_format} from '~/config/dates';

class App extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			source: [],
			query: {
				name: false,
				between: {
					start: formatDate(startOfMonth(new Date()), date_format),
					end: formatDate(endOfMonth(new Date()), date_format)
				},
				include_categories: false,
				exclude_categories: false
			},
			modal_exists: false
		};

		this.fillData = this.fillData.bind(this);
		this.updateQuery = this.updateQuery.bind(this);
		this.setQuery = this.setQuery.bind(this);
		this.createModal = this.createModal.bind(this);
		this.destroyModal = this.destroyModal.bind(this);
		this.modalClose = this.modalClose.bind(this);
		this.modalSave = this.modalSave.bind(this);

		this.entriesdb = new ldb();

		financesAPI.everything().then(response => {
			let new_data = response.data.entries;
			this.entriesdb.LoadAll(new_data);
			this.fillData(this.entriesdb.GetByQuery());
		})
	}

	fillData(new_data){
		this.setState({source: new_data});
	}

	updateQuery(params){
		let newParams = Object.assign({},this.state.query,params);
		this.setState({query: newParams});
	}

	setQuery(params){
		let newParams = Object.assign({}, params);
		this.setState({query: newParams});
	}

	getName(name){
		let query = { name };

		this.fillData(this.entriesdb.GetByQuery(query));
	}

	getCategories(has, has_not){
		let query = { categories: { has, has_not } };

		this.fillData(this.entriesdb.GetByQuery(query));
	}

	componentDidMount(){
		if(typeof feather !== 'undefined') feather.replace();
	}

	componentDidUpdate(){
		console.log('waaaat',this.state.modal_exists);
		if(this.state.modal_exists) OpenModal("kjalsdkjalsdjalsdkj");
	}

	createModal(){
		this.setState({modal_exists: true});
	}

	destroyModal(){
		this.setState({modal_exists: false});
	}

	modalClose(modal_id){
		CloseModal(modal_id);
	}

	modalSave(params, modal_id){
		this.modalClose(modal_id);
		this.setState({query: params});
	}

	render() {
		return (
			<div className="row">
				<SideNav>
					<FilterByDate filter={this.updateQuery} modal_id={"kjalsdkjalsdjalsdkj"} start={this.state.query.between.start} end={this.state.query.between.end} addAction={this.createModal} />
					<SideNavGroup title="Random Shit">
						<SideNavItem feather="layers" href="#" action={() => this.updateQuery({name: 'Coffee'})}>Only Coffee</SideNavItem>
						<SideNavItem feather="layers" href="#" action={() => this.updateQuery({ include_categories: ['Groceries'] })}>Only Groceries</SideNavItem>
						<SideNavItem feather="layers" href="#" action={() => this.updateQuery({ exclude_categories: ['Extra'] } )}>Remove Extra</SideNavItem>
						<SideNavItem feather="layers" href="#" action={() => this.updateQuery({ exclude_categories: false } )}>Return Extra</SideNavItem>
					</SideNavGroup>
				</SideNav>

				<MainContent title={"Finances"}>
					<TranasctionListSection title={"Grawr"} list={this.entriesdb.GetByQuery(this.state.query)} />
				</MainContent>

				{this.state.modal_exists ? 
					<ChangeFiltersModal
						query={this.state.query}
						modal_id="kjalsdkjalsdjalsdkj"
						onClose={this.destroyModal}
						modalClose={this.modalClose}
						actionPhrase="Update Filter"
						action={this.modalSave}
						title="Update Search Filter"
					/>
				: ''}
				
			</div>
		);
	}
}
/*

<label><input type="radio" value="['value','name',null]" name="newgroup" /> Name </label><br />
					<label><input type="radio" value="['array','categories','all']" name="newgroup" /> Categories (Joined)</label><br />
					<label><input type="radio" value="['array','categories',null]" name="newgroup" /> Categories (Separate)</label><br />
					*/

/*
	<MainSection className="col-12 col-sm-6">
		<div style={{backgroundColor: 'blue'}}>I am inside of a flex item weeee</div>
	</MainSection>
	<SideNavGroup>
		<SideNavItem feather="home" href="#">Dashboard</SideNavItem>
		<SideNavItem feather="file" href="#">Orders</SideNavItem>
	</SideNavGroup>
*/

// App.propTypes = {};

export default App;