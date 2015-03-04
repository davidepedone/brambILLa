<?php

	require_once($_SERVER['DOCUMENT_ROOT']."/view/PlayView.php");

	header('Content-Type: application/json');

	$view = new PlayView();

	$ill = isset( $_GET['ill'] ) ? $_GET['ill'] : '';
	$drug = isset( $_GET['drug'] ) ? $_GET['drug'] : '';

	echo json_encode( $view->check( $ill, $drug ) );