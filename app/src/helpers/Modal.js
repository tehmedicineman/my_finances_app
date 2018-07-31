var $ = require('jquery');

export const modal_id = 'superawesomemodalkey';

export function OpenModal(derp){
	$('#'+derp).modal('show');
}

export function CloseModal(derp){
	$('#'+derp).modal('hide');
}

export function ToggleModal(){
	$('#'+modal_id).modal('toggle');
}