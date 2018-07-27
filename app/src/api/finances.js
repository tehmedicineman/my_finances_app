const axios = require('axios');
import api from './config';

export function everything(){

	return axios(api.url);	
}

export function getByCategories(has, has_not){
	if(typeof has_not === 'undefined') has_not = [];

	let has_string = has.join(';');
	let has_not_string = has_not.join(';');
	let uri = "filter/" + has_string + (has_not_string != "" ? ("/" + has_not_string) : "");

	return axios(api.url + uri);	
}

export function getBetween(start, end){
	let uri = "between/" + start + "/" + end;

	return axios(api.url + uri);	
}

export function getByName(name){
	let uri = "name/" + name;

	return axios(api.url + uri);	
}

export function fullQuery(params){
	let uri = "query";

	return axios.post(api.url + uri, params);	
}