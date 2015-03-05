<?php

$homedir = substr( $_SERVER['SCRIPT_FILENAME'],0,-strlen($_SERVER['SCRIPT_NAME']) ).'/';
require_once($homedir."lib/controller/PlayController.php");

class PlayView{

    private $controller;
 
    public function __construct() {
        $this->controller = new PlayController();
    }
     
    public function get(){
        return $this->controller->get();
    }

    public function check( $ill, $drug ){
        return $this->controller->check( $ill, $drug );
    }

}