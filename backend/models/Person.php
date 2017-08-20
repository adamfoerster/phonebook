<?php
class Person{
    public $id = 0;
    public $name = '';
    public $phone = '';
    public $list = [];

    public function __construct(){
        if (isset($_SESSION['person_list'])){
            $this->list = json_decode(file_get_contents('array.json'), true);
        } else {
            $this->list = [
                1 => [ 'id'=> 1, 'name' => 'Adam Foerster', 'phone' => '34689865'],
                2 => [ 'id'=> 2, 'name' => 'Rebecca Foerster', 'phone' => '3496876430'],
            ];
            file_put_contents("array.json",json_encode($this->list));
        }
    }

    public function fetch(){
        return $this->list;
    }

    public function add($person){
        $person['id'] = sizeof($this->list);
        $this->list->append($person);
        file_put_contents("array.json",json_encode($this->list));
        return true;
    }

    public function load($id){
        foreach ($this->list as $person) {
            if ($person->id == $id) {
                $this->name = $person->name;
                $this->id = $person->id;
                $this->phone = $person->phone;
                return $person;
            }
            return false;
        }
    }

    public function edit($person){
        $this->load($person['id']);
        $this->list[$person['id']] = $person;
        file_put_contents("array.json",json_encode($this->list));
    }

    public function delete($id){
        unset($this->list[$id]);
        file_put_contents("array.json",json_encode($this->list));
    }
}
?>
