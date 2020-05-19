<?php

ini_set("display_errors", 1);
error_reporting(E_ALL);

$isDebuging = true;

function debug($str)
{
	global $isDebuging;
	
	if (!$isDebuging)
		return;

	echo "<pre>";
	var_dump($str);
	echo "</pre>";
}

spl_autoload_register(
	function($class)
	{
		$path = str_replace('\\', '/', $class.".php");

		if (file_exists($path))
			include $path;	
	}
);

?>