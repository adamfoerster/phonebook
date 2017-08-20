<?php

require('./controllers/PhoneBookCtrl.php');
require('./models/Person.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$pbCtrl = new PhoneBookCtrl();

if (isset($_GET['r'])){
    switch ($_GET['r']) {
        case 'phonebook.save':
            echo(json_encode($pbCtrl->save($_POST)));
            break;
        case 'phonebook.list':
            echo(json_encode($pbCtrl->fetch()));
            break;

        case 'phonebook.load':
            echo(json_encode($pbCtrl->load(1)));
            break;
        case 'phonebook.delete':
            echo(json_encode($pbCtrl->delete(1)));
            break;

        default:
            require('./views/default.php');
            break;
    }
}
?>
