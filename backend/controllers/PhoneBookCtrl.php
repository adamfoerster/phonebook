<?php
// include_once('./models/Person.php');

class PhoneBookCtrl{
    public $person;

    public function __construct(){
        $this->person = new Person();
    }

    public function save($person){
        echo 'vou buscar' . $person['id'];
        print_r($this->person->load($person['id']));
        exit;
        if ($person['id'] && $this->person->load($person['id'])){
            return ['recordSaved'=> $this->person->edit($person)];
        } else {
            return ['recordAdded'=> $this->person->add($person)];
        }
    }

    public function fetch(){
        return $this->person->fetch();
    }

    public function delete($id){
        $this->person->delete($id);
    }

    public function load($id){
        return $this->person->load($id);
    }
}
?>
