import React, { PropTypes } from 'react';

//-- libraries and such
	require('jquery');
	require('bootstrap');
	require('mathjs');
	const feather = require('feather-icons');
	const axios = require('axios');
	const financesAPI = require('../api/finances');

//-- components
	import SideNav from './layout/SideNav';
	import SideNavGroup from './layout/SideNavGroup';
	import SideNavItem from './layout/SideNavItem';
	import MainContent from './layout/MainContent';
	import MainSection from './layout/MainSection';
	import TransactionTable from './TransactionTable';
	import FilterMonths from './FilterMonths';
	import TranasctionListSection from './TranasctionListSection';

//-- libraries
	// import DataGroupifier from './libraries/DataGroupifier.js'

class App extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			lists: [],
			queries: []
		};

		this.fillData = this.fillData.bind(this);
		this.addData = this.addData.bind(this);
		this.getBetween = this.getBetween.bind(this);
		this.sortBy = this.sortBy.bind(this);
		this.addList = this.addList.bind(this);

		financesAPI.getByCategories(['Groceries']).then(this.fillData)
	}

	addList(query){
		financesAPI.getByName(query.name).then(this.addData);
	}

	addData(response){
		let new_data = response.data.entries;
		let lists = Object.assign([],this.state.lists);
		lists.push(new_data);

		this.setState({lists});
	}

	fillData(response){
		let new_data = response.data.entries;
		this.setState({lists: [new_data]});
	}

	getBetween(start, end, title){
		financesAPI.getBetween(start,end).then(this.fillData);
		// .then(() => {
		// 	this.setState({current_view: title});
		// });
	}

	componentDidMount(){
		if(typeof feather !== 'undefined') feather.replace();
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
					<FilterMonths filter={this.getBetween} />
				</SideNav>

				<MainContent title={"Finances"}>
					{
						this.state.lists.map((list, listNum) => {
							console.log('derp',list);
							return <TranasctionListSection key={"tls-"+listNum} title={"Grawr"} list={list} onChoose={this.addList} />
						})
					}
				</MainContent>
			</div>
		);
	}
}

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