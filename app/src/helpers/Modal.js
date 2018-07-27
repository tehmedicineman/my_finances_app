var $ = require('jquery');

export const ModalId = 'superawesomemodalkey';

export function OpenModal(derp){
	$('#'+derp).modal('show');
}

export function CloseModal(derp){
	$('#'+derp).modal('hide');
}

export function ToggleModal(){
	$('#'+ModalId).modal('toggle');
}