<?php

class Ill{

	private $list = array(
		 'mdt' => array(
		 	'name' => 'mal di testa',
		 	'desc' => 'Oggi non sto bene ragazzi, ho un mal di testa. Controllo un secondo su forum al femminile cosa posso prendere',
		 	'drug' => array(
		 		'id' => 'tach500',
		 		'name' => 'tachipirina 500',
		 	)
		 )
		 /*
		'mal di testa' => 'tachipirina 500',
		'febbre' => 'tachipirina 1000',
		'nausea' => 'plasil',
		'aaaa' => 'bbbb',
		'cccc' => 'dddd',
		'eeee' => 'ffff'
		*/
	);

	public function getList(){
		return $this->list;
	}

	public function getSize(){
		return count( $this->list );
	}
}
