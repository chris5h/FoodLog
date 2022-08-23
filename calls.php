<?php
    if (is_array($_GET) || is_array($_POST)){
        $json = file_get_contents('settings.json');
        $settings = json_decode($json);
        require_once 'models/food.php';
        $bob = new Food($settings->servername, $settings->username, $settings->password, $settings->db);
        if ($_GET){
            if ($_GET['type'] == 'all'){
                $arr = $bob->getAll();
                $data = ["data" => $arr];
                print json_encode($data, JSON_PRETTY_PRINT);
                die();
            }
        }   else if ($_POST){
            switch ($_POST['trans']){
                case 'new':
                    $dt = $_POST['date']." ".$_POST['time'];
                    $bob->newFood($dt, $_POST['type'], $_POST['description']);          
                    break;
                case 'edit':
                    $dt = $_POST['date']." ".$_POST['time'];
                    $bob->updateFood($_POST['id'], $dt, $_POST['type'], $_POST['description']);
                    break;
                case 'delete':
                    $bob->delFood($_POST['id']);
                    break;
            }
        }
    }
?>