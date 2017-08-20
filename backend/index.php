<?php

require('./controllers/PhoneBookCtrl.php');
require('./models/Person.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$pbCtrl = new PhoneBookCtrl();
// print_r($_GET);
if (isset($_GET['r'])){
    switch ($_GET['r']) {
        case 'phonebook.save':
            print_r($_POST);
            $pbCtrl->save();
            break;
        case 'phonebook.list':
            echo(json_encode($pbCtrl->fetch()));
            break;

        case 'phonebook.load':
            $pbCtrl->load(1);
            break;
        case 'phonebook.delete':
            $pbCtrl->delete(1);
            break;

        default:
            require('./views/default.php');
            break;
    }
}
?>
