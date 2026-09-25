<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

try {
	require_once('../../minecraft-server-status/MinecraftServer.php');
	$server = new MinecraftServer('104.167.230.18');
	
} catch (Exception $e) {
	// handle errors
	dump_var($e);
	exit;
}

?>
