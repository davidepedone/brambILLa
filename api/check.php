<?php

	$homedir = substr( $_SERVER['SCRIPT_FILENAME'],0,-strlen($_SERVER['SCRIPT_NAME']) ).'/';
	require_once($homedir."lib/view/PlayView.php");

	header('Content-Type: application/json');

	$view = new PlayView();

	$ill = isset( $_GET['ill'] ) ? $_GET['ill'] : '';
	$drug = isset( $_GET['drug'] ) ? $_GET['drug'] : '';

	echo json_encode( $view->check( $ill, $drug ) );