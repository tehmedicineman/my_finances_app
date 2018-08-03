import React, { PropTypes } from 'react';

//-- libraries and such
	const $ = require('jquery');
	require('bootstrap');
	require('mathjs');
	const feather = require('feather-icons');
	const financesAPI = require('../api/finances');
	import ldb from '../libraries/LDB';

//-- components
	import WindowPane from './WindowPane';
	import PageTitle from './layout/PageTitle';
	import PageBody from './layout/PageBody';
	import SideNav from './layout/SideNav';
	import SideNavGroup from './layout/SideNavGroup';
	import SideNavItem from './layout/SideNavItem';
	import MainContent from './layout/MainContent';
	import SideNavFilters from './SideNavFilters';
	import TranasctionListSection from './TranasctionListSection';

//-- libraries
	var formatDate = require('date-fns/format');
	var startOfMonth = require('date-fns/start_of_month');
	var endOfMonth = require('date-fns/end_of_month');
	var subMonths = require('date-fns/sub_months');
	var addMonths = require('date-fns/add_months');

//-- stylesss
	import '~/css/hovers.css';
	import '~/css/bootstrap-additions.css';
	import 'react-datepicker/dist/react-datepicker.css';


class App extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			source: [],
			query: {
				name: false,
				between: {
					start: startOfMonth(new Date()),
					end: endOfMonth(new Date())
				},
				include_categories: false,
				exclude_categories: false
			},
			db: new ldb(),
			windows: [],
			windows_key: 0
		};

		this.fillData = this.fillData.bind(this);
		this.fillDB = this.fillDB.bind(this);
		this.updateQuery = this.updateQuery.bind(this);

		this.addWindow = this.addWindow.bind(this);
		this.removeWindow = this.removeWindow.bind(this);

		this.entriesdb = new ldb();

		//-- default page stuff

			financesAPI.everything().then(response => {
				let new_data = response.data.entries;
				this.entriesdb.LoadAll(new_data);
				this.fillData(this.entriesdb.GetByQuery());
				this.fillDB(this.entriesdb);
			}).then(() => {
				this.addWindow();
			})
	}

	fillData(new_data){
		this.setState({source: new_data});
	}

	fillDB(new_loki){
		this.setState({db: new_loki});
	}

	updateQuery(params){
		let newParams = Object.assign({},this.state.query,params);
		this.setState({query: newParams});
	}

	componentDidMount(){
		if(typeof feather !== 'undefined') feather.replace();
	}

	componentDidUpdate(){
		if(typeof feather !== 'undefined') feather.replace();
	}

	addWindow(){
		let windows = Object.assign([],this.state.windows);
		let windows_key = this.state.windows_key + 1;
			windows.push(<WindowPane key={'windows-'+windows_key} db={this.state.db} />);
		this.setState({windows, windows_key});
	}

	removeWindow(window_key){
		let windows = Object.assign([],this.state.windows);
			windows.splice(window_key,1);
		this.setState({windows});
	}

	render() {
		return (
			<div className="row">
				<SideNav>
					<SideNavFilters
						start={this.state.query.between.start}
						end={this.state.query.between.end}
						name={this.state.query.name}
						updateQuery={this.updateQuery}
					/>
					<SideNavGroup title="Preset Filters">
					<SideNavItem feather="layers" action={() => {
							this.updateQuery({
								between: {
									start: startOfMonth(new Date()),
									end: endOfMonth(new Date())
								}
							})
						}}>This Month</SideNavItem>
						<SideNavItem feather="layers" action={() => {
							this.updateQuery({
								between: {
									start: startOfMonth(subMonths(new Date(),1)),
									end: endOfMonth(subMonths(new Date(),1))
								}
							})
						}}>Last Month</SideNavItem>
						<SideNavItem feather="layers" action={() => {
							this.updateQuery({
								between: {
									start: startOfMonth(subMonths(this.state.query.between.start,1)),
									end: endOfMonth(subMonths(this.state.query.between.end,1))
								}
							})
						}}>-1 Month</SideNavItem>
						<SideNavItem feather="layers" action={() => {
							this.updateQuery({
								between: {
									start: startOfMonth(addMonths(this.state.query.between.start,1)),
									end: endOfMonth(addMonths(this.state.query.between.end,1))
								}
							})
						}}>+1 Month</SideNavItem>
					</SideNavGroup>
				</SideNav>

				<MainContent title={"Finances"}>
					<PageTitle title="Finances!!" action={this.updateQuery} query={this.state.query} windows={this.state.windows} addWindow={this.addWindow} removeWindow={this.removeWindow} />
					<PageBody>
						{this.state.windows.map((v,k) => v )}
					</PageBody>
				</MainContent>
				
			</div>
		);
	}
}

/*
	<TranasctionListSection title={() => {
		let startMonth = formatDate(this.state.query.between.start,"MMMM");
		let endMonth = formatDate(this.state.query.between.end,"MMMM");
	
		console.log(startMonth,endMonth);
		let title = startMonth;

		if(endMonth != startMonth)
			title += " - " + endMonth;

		return title;
	}} list={this.entriesdb.GetByQuery(this.state.query)} />
*/

// App.propTypes = {};

export default App;