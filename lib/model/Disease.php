<?php

class Disease{

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
		 	'name' => 'mal di gola',
		 	'desc' => 'ho un mal di gola fortissimo<br>va beh ... sigaretta ?',
		 	'drug' => array(
		 		'id' => 'tach1000',
		 		'name' => 'tachipirina 1000',
		 	)
		 ),
		 'mdb' => array(
		 	'name' => 'mal di gambe',
		 	'desc' => 'ho un mal di gambe<br>ho camminato 5 km<br>mi sembra di aver fatto<br>la maratona',
		 	'drug' => array(
		 		'id' => 'muscoril',
		 		'name' => 'muscoril',
		 	)
		 ),
		 'mds' => array(
		 	'name' => 'mal di gambe',
		 	'desc' => 'ho un mal di schiena<br>stanotte mi ha investito<br>un camion mentre dormivo',
		 	'drug' => array(
		 		'id' => 'poltrona',
		 		'name' => 'poltrona da ufficio',
		 	)
		 ),
		 'int' => array(
		 	'name' => 'intestino',
		 	'desc' => 'sai che sono stato male<br>settimana scorsa...<br>si vede che ho l\'intestino<br>irritato',
		 	'drug' => array(
		 		'id' => 'enterogermina',
		 		'name' => 'enterogermina',
		 	)
		 ),
		 'deb' => array(
		 	'name' => 'debolezza',
		 	'desc' => 'mi sento debole<br>sarà carenza di sali minerali...',
		 	'drug' => array(
		 		'id' => 'polase',
		 		'name' => 'polase',
		 	)
		 ),
		 'gas' => array(
		 	'name' => 'bruciori di stomaco',
		 	'desc' => 'ho un\'acidità di stomaco<br>pazzesca...va là, fumo<br>poi vado in mensa<br>a mangiare la peperonata',
		 	'drug' => array(
		 		'id' => 'riopan',
		 		'name' => 'riopan',
		 	)
		 ),
		 'mdc' => array(
		 	'name' => 'mal di collo',
		 	'desc' => 'mi fa male il collo<br>non riesco a girare<br>la testa',
		 	'drug' => array(
		 		'id' => 'oki',
		 		'name' => 'oki',
		 	)
		 ),
		 'ptb' => array(
		 	'name' => 'pettorale ballerino',
		 	'desc' => 'ho preso la scossa<br>mi pulsa il pettorale da<br>2 giorni<br>sembro un culturista',
		 	'drug' => array(
		 		'id' => 'defibrillatore',
		 		'name' => 'defibrillatore',
		 	)
		 ),
	);

	public function getList(){
		return $this->list;
	}

	public function getSize(){
		return count( $this->list );
	}
}
