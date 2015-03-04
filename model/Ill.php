<?php

class Ill{

	private $list = array(
		 'mdt' => array(
		 	'name' => 'mal di testa',
		 	'desc' => 'ho un mal di testa.<br>Controllo un secondo su<br>forum al femminile cosa<br>posso prendere',
		 	'drug' => array(
		 		'id' => 'tach500',
		 		'name' => 'tachipirina 500',
		 	)
		 ),
		 'fbr' => array(
		 	'name' => 'febbre',
		 	'desc' => 'mi sento la febbre.<br>Avrò 37 e 1<br>valà che ho preso<br>l\'influenza',
		 	'drug' => array(
		 		'id' => 'vaccino',
		 		'name' => 'vaccino antinfluenzale',
		 	)
		 ),
		 'drr' => array(
		 	'name' => 'diarrea',
		 	'desc' => 'ho preso lo sghittone.<br>sono andato in bagno 10 volte<br>non aprite quella porta',
		 	'drug' => array(
		 		'id' => 'imodium',
		 		'name' => 'imodium',
		 	)
		 ),
		 'cap' => array(
		 	'name' => 'alopecia',
		 	'desc' => 'sto perdendo i capelli.<br>arriverete alla mia età<br>anche io una volta li avevo',
		 	'drug' => array(
		 		'id' => 'bioscalin',
		 		'name' => 'bioscalin',
		 	)
		 ),
		 'nau' => array(
		 	'name' => 'nausea',
		 	'desc' => 'ho vomitato l\'anima stanotte<br>mi sa che non vengo a lavoro<br>mica che vi infetto',
		 	'drug' => array(
		 		'id' => 'plasil',
		 		'name' => 'plasil',
		 	)
		 ),
		 'mdg' => array(
		 	'name' => 'mal di gupnp_root_device_get_relative_location(root_device)',
		 	'desc' => 'ho un mal di gola fortissimo<br>va beh ... sigaretta ?',
		 	'drug' => array(
		 		'id' => 'tach1000',
		 		'name' => 'tachipirina 1000',
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
