<?php

	$homedir = substr( $_SERVER['SCRIPT_FILENAME'],0,-strlen($_SERVER['SCRIPT_NAME']) ).'/';
	require_once($homedir."lib/view/PlayView.php");

	$view = new PlayView();
	header('Content-Type: application/json');
	echo $view->get();