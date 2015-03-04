<?php

require_once($_SERVER['DOCUMENT_ROOT']."/controller/PlayController.php");

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