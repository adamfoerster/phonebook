var list = [
    {id:"1", name:"Adam Foerster", phone:"243352323"},
    {id:"2", name:"Rebecca Foerster", phone:"243352323"},
    {id:"3", name:"Phoebe Buffay", phone:"243352323"},
    {id:"4", name:"Chandler Bing", phone:"243352323"},
    {id:"5", name:"Monica Geller", phone:"243352323"},
    {id:"6", name:"Ross Geller", phone:"243352323"},
    {id:"7", name:"Rachel Gray", phone:"243352323"},
];

$(list).each(function(){
    $('#tbody').append(`<tr id="person_${this.id}"><td>${this.name}</td><td>${this.phone}</td></tr>`);
});

$('#edit').hide();
$('#view').hide();

$('tr').click(function(e){
    load(e.currentTarget.id);
});

var seeTable = function(){
    $('#table').show();
    $('#edit').hide();
    $('#view').hide();
};

var save = function(person){
    seeTable();
};

var load = function(personId){
    var p = findPerson(personId.substring(7));

    $('#table').hide();
    $('#view').show();

    $('#view .card-body h1').html(p.name);
    $('#view .card-body p').html(p.phone);

    $('#editBtn').click(function(){
        edit(p.id);
    });

    $('#deleteBtn').click(function(){
        exclude(p.id);
    });
};

var edit = function(id){
    var p = findPerson(id);
    $('#save').click(save);
    $('#name').val(p.name);
    $('#phone').val(p.phone);
    $('#view').hide();
    $('#edit').show();
};

var exclude = function(id){
    console.log('exclude', id);
    seeTable();
};

var findPerson = function(id){
    return list.find(function(person){
        return person.id == id;
    });
}
