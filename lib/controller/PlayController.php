<?php

$homedir = substr( $_SERVER['SCRIPT_FILENAME'],0,-strlen($_SERVER['SCRIPT_NAME']) ).'/';
require_once($homedir."lib/model/Disease.php");

class PlayController{

	private $disease;

	public function __construct(){
		$this->disease = new Disease();
	}

	public function get(){

		// # Get cookie
		$cookie = isset( $_COOKIE['brambilla'] ) ? explode( '|', $_COOKIE['brambilla'] ) : array();

		// # Pick a random key from disease array
		$randomKey = array_rand( $this->disease->getList() );
		
		while ( in_array( $randomKey, $cookie ) ) {
			// # Disease already used, pick another one
			$randomKey = array_rand( $this->disease->getList() );
		}

		// # Get disease from array by key
		$disease = $this->disease->getList()[ $randomKey ];

		// # Set key for check
		$disease['id'] = $randomKey;

		// # Hide answer
		unset($disease['drug']);

		// # Return response
		return json_encode( $disease );
	}

	public function check( $id, $drug ){

		$result = array( 'result'=> false );

		if( !isset( $this->disease->getList()[ $id ] ) ){
			return $result;
		}

		if( $this->disease->getList()[ $id ]['drug']['id'] == $drug ){

			$result['result'] = $this->disease->getList()[ $id ]['drug']['name'];
		}
		
		return $result;

	}
}