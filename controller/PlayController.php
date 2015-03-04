<?php

require_once($_SERVER['DOCUMENT_ROOT']."/model/Ill.php");

class PlayController{

	private $ill;

	public function __construct(){
		$this->ill = new Ill();
	}

	public function get(){

		// # Pick a random key from ill array
		$randomKey = array_rand($this->ill->getList());
		
		// # Get ill from array by key
		$ill = $this->ill->getList()[ $randomKey ];

		// # Set key for check
		$ill['id'] = $randomKey;

		// # Hide answer
		unset($ill['drug']);

		// # Return response
		return json_encode( $ill );
	}

	public function check( $id, $drug ){

		$result = array( 'result'=> false );

		if( !isset( $this->ill->getList()[ $id ] ) ){
			return $result;
		}

		if( $this->ill->getList()[ $id ]['drug']['id'] == $drug ){

			$result['result'] = $this->ill->getList()[ $id ]['drug']['name'];
		}
		
		return $result;

	}
}