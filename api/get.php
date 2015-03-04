<?php

	require_once($_SERVER['DOCUMENT_ROOT']."/view/PlayView.php");

	$view = new PlayView();
	header('Content-Type: application/json');
	echo $view->get();