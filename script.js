var backend = "http://phonebook.adamfoerster.com/backend/index.php?r=";

var list = [];
$('#table').hide();
$('#edit').hide();
$('#view').hide();
$.get(backend + "phonebook.list",
    function(data) {
        // list = data;
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

var seeTable = function() {
    $('#tbody').html('');
    $(list).each(function() {
        $('#tbody').append(`<tr id="person_${this.id}"><td>${this.name}</td><td>${this.phone}</td></tr>`);
    });
    $('tr').click(function(e) {
    	load(e.currentTarget.id);
    });
    $('#add').click(function(){
        edit();
    });
	$('#table').show();
	$('#edit').hide();
	$('#view').hide();
};

var save = function() {
    let post = {id: $('#id').val(), name: $('#name').val(), phone: $('#phone').val()};
    $.post(backend+'phonebook.save' , post)
    .done(function(){
        console.log('post sent');
        seeTable();
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

var edit = function(id=null) {
    if (id){
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
    $.get(backend+'phonebook.delete?id='+id)
    .done(function(data){
        seeTable();
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
