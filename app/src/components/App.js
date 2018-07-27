import React, { PropTypes } from 'react';

//-- libraries and such
	const $ = require('jquery');
	require('bootstrap');
	require('mathjs');
	const feather = require('feather-icons');
	const financesAPI = require('../api/finances');
	import ldb from '../libraries/LDB';
	import {ModalId, OpenModal, CloseModal} from '~/helpers/Modal';

//-- components
	import SideNav from './layout/SideNav';
	import SideNavGroup from './layout/SideNavGroup';
	import SideNavItem from './layout/SideNavItem';
	import MainContent from './layout/MainContent';
	import ChangeFiltersModal from '~/components/modals/ChangeFiltersModal';
	import FilterMonths from './FilterMonths';
	import FilterByDate from './FilterByDate';
	import TranasctionListSection from './TranasctionListSection';

//-- libraries
	// import DataGroupifier from './libraries/DataGroupifier.js'

class App extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			source: [],
			query: {
				name: false,
				between: {
					start: false,
					end: false
				},
				include_categories: false,
				exclude_categories: false
			},
			modal_open: false
		};

		this.fillData = this.fillData.bind(this);
		this.updateQuery = this.updateQuery.bind(this);
		this.setQuery = this.setQuery.bind(this);
		this.changeModal = this.changeModal.bind(this);
		this.updateAndOpen = this.updateAndOpen.bind(this);
		this.modalClose = this.modalClose.bind(this);
		this.modalSave = this.modalSave.bind(this);

		this.sortBy = this.sortBy.bind(this);

		this.entriesdb = new ldb();

		financesAPI.everything().then(response => {
			let new_data = response.data.entries;
			this.entriesdb.LoadAll(new_data);
			this.fillData(this.entriesdb.GetByQuery());
		})
	}

	changeModal(new_modal){
		this.setState({modal_content: new_modal});
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
		console.log('waaaat',this.state.modal_open);
		if(this.state.modal_open) OpenModal("kjalsdkjalsdjalsdkj");
		// else CloseModal("kjalsdkjalsdjalsdkj");
	}

	componentWillUpdate(){
		console.log('gonna do stuff', this.state.modal_open);
		if(!this.state.modal_open) CloseModal("kjalsdkjalsdjalsdkj");
	}

	updateAndOpen(element){
		// console.log('stupid react being smart and shit',element);
		// this.setState({modal_content: element});
		this.setState({modal_open: true});
	}

	modalClose(){
		this.setState({modal_open: false});
	}

	modalSave(params){
		// this.updateQuery(params);
		// CloseModal("kjalsdkjalsdjalsdkj");
		this.setState(Object.assign(params,{modal_open: false}));
	}

	sortBy(sortFunc){
		let sorted = this.state.current_data;
		sorted = sorted.sort(sortFunc);
		this.setState({current_data: sorted});
	}

	render() {
		return (
			<div className="row">
				<SideNav>
					<FilterMonths filter={this.updateQuery} modalId={ModalId} />
					<FilterByDate filter={this.updateQuery} modalId={"kjalsdkjalsdjalsdkj"} start={this.state.query.between.start} end={this.state.query.between.end} addAction={this.updateAndOpen} />
					<SideNavGroup title="Random Shit" addNew={this.changeModal}>
						<SideNavItem feather="layers" href="#" action={() => this.updateQuery({name: 'Coffee'})}>Only Coffee</SideNavItem>
						<SideNavItem feather="layers" href="#" action={() => this.updateQuery({ include_categories: ['Groceries'] })}>Only Groceries</SideNavItem>
						<SideNavItem feather="layers" href="#" action={() => this.updateQuery({ exclude_categories: ['Extra'] } )}>Remove Extra</SideNavItem>
						<SideNavItem feather="layers" href="#" action={() => this.updateQuery({ exclude_categories: false } )}>Return Extra</SideNavItem>
					</SideNavGroup>
				</SideNav>

				<MainContent title={"Finances"}>
					<TranasctionListSection title={"Grawr"} list={this.entriesdb.GetByQuery(this.state.query)} />
				</MainContent>

				{this.state.modal_open ? 
					<ChangeFiltersModal
						query={this.state.query}
						modalId="kjalsdkjalsdjalsdkj"
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