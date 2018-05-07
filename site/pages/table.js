console.log('yo');

var $$ = {
	groups: {
		list: [],
		add(text, type, key, qualifier){
			var new_group = $$.templates.navGroups(text, type, key, qualifier);
			if(new_group) $$.page.currentGroups().appendChild(new_group);
			feather.replace();
		},

	},
	changeActiveGroup(type, key, qualifier) {
		console.log($$.EVERYTHING.groupBy(type, key, qualifier));
	},
	
	page: {
		currentGroups() { return document.getElementById('current_groups'); }
	},
	templates: {
		navGroups(text, type, key, qualifier) {
			if(typeof text === 'undefined') return false;
			if(typeof type === 'undefined') return false;
			if(typeof key === 'undefined') return false;
			if(typeof qualifier === 'undefined') qualifier = null;

			var li = document.createElement('li');
				li.className = 'nav-item';
				li.dataset.type = type;
				li.dataset.key = key;
				li.dataset.qualifier = qualifier;
				li.addEventListener('click', function(){
					$$.changeActive(this.dataset.type, this.dataset.key, this.dataset.qualifier);
				});
				var a = document.createElement('a');
					a.className = "nav-link";
					a.setAttribute('href',"#");
					var feather = document.createElement('span');
						feather.dataset.feather = "file-text";
						a.appendChild(feather);
					var span = document.createElement('span');
						span.innerHTML = text;
						a.appendChild(span);
			li.appendChild(a);

			return li;
		}
	},
};

var test_headers = [
	'Name',
	'Cost',
	'Categories',
	'Date Of'
];

$$.format_data = function(data){
	var output = [];
	data.forEach((d) => {
		output.push([
			d.name,
			d.cost,
			(d.categories ? d.categories.join('; ') : ""),
			d.date_of,
		])
	});
	return output;
}

onloaders.push(() => {

	axios('http://localhost:4444/finances')
		.then((response) => {
			$$.EVERYTHING = new DataGroupifier(response.data.entries);
		});
	axios('http://localhost:4444/finances/month/2')
		.then((response) => {
			$$.february = response.data.entries;
		});
	axios('http://localhost:4444/finances/month/3')
		.then((response) => {
			$$.march = response.data.entries;
		});
	axios('http://localhost:4444/finances/month/4')
		.then((response) => {
			$$.april = response.data.entries;
		});
});