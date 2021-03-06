var backend = "https://phonebook.adamfoerster.com/backend/";
backend = backend + 'index.php?r=';

if ('serviceWorker' in navigator) {
	console.log('CLIENT: service worker registration in progress.');
	navigator.serviceWorker.register('/service-worker.js').then(function() {
		console.log('CLIENT: service worker registration complete.');
	}, function() {
		console.log('CLIENT: service worker registration failure.');
	});
} else {
	console.log('CLIENT: service worker is not supported.');
}

var list = [];
$('#table').hide();
$('#edit').hide();
$('#view').hide();

var fetchTable = function() {
	$.get(backend + "phonebook.list&t=" + (new Date().getTime()),
			function(data) {
				list = [];
				for (var person in data) {
					if (data.hasOwnProperty(person)) {
						list.push(data[person]);
					}
				}
				seeTable();
			})
		.fail(function(error) {
			console.log(error);
		});
}
fetchTable();

var seeTable = function() {
	$('#tbody').html('');
	$(list).each(function() {
		$('#tbody').append(`<tr id="person_${this.id}"><td>${this.name}</td><td>${this.phone}</td></tr>`);
	});
	$('tr').click(function(e) {
		load(e.currentTarget.id);
	});
	$('#add').click(function() {
		edit();
	});
	$('#table').show();
	$('#edit').hide();
	$('#view').hide();
};

var save = function() {
	let post = {
		id: $('#id').val(),
		name: $('#name').val(),
		phone: $('#phone').val()
	};
	$.post(backend + 'phonebook.save', post)
		.done(function() {
			console.log('post sent');
			fetchTable();
		})
		.fail(function(error) {
			console.log(error);
		});
};

var load = function(personId) {
	var p = findPerson(personId.substring(7));
	$('#view .card-body h1').html(p.name);
	$('#view .card-body p').html(p.phone);
	$('#editBtn').click(function() {
		edit(p.id);
	});

	$('#table').hide();
	$('#view').show();

	$('#deleteBtn').click(function() {
		exclude(p.id);
	});
};

var edit = function(id = null) {
	if (id) {
		var p = findPerson(id);
		$('#id').val(id);
		$('#name').val(p.name);
		$('#phone').val(p.phone);

	}
	$('#save').click(save);
	$('#table').hide();
	$('#view').hide();
	$('#edit').show();
};

var exclude = function(id) {
	// console.log('exclude', id);
	$.get(backend + 'phonebook.delete&id=' + id)
		.done(function(data) {
			fetchTable();
		})
		.fail(function(error) {
			console.log(error);
		});
};

var findPerson = function(id) {
	return list.find(function(person) {
		return person.id == id;
	});
}
