<?php
	
include "Application/Lib/Dev.php";

use Application\Core\Router;

session_start();

$router = new Router();
$router->Run();
	
?>