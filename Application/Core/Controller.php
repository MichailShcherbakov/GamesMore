<?php

namespace Application\Core;

use Application\Core\View;

abstract class Controller
{
	protected $route;
	protected $view;
	protected $model;
	protected $args = [];

	public function __construct($route, $view, $model)
	{
		$this->route = $route;
		$this->view = $view;
		$this->model = $model;

		if (!$this->HasAccess())
			return;
	}

	public function HasAccess()
	{
		$access = include "Application/Config/Access.php";
		$url = $this->route["url"];

		$url = preg_replace("#^/?([0-9a-z-]+/?)?([0-9a-z-]+)/?$#", "$1$2", $url);
		
		if ($url == "/")
			$url = "";

		if (in_array($url, $access["All"]))
		{
			return true;
		}
		else if (in_array($url, $access["Registered"]))
		{
			if (isset($_COOKIE["lg-token"]) && $this->model->IsValidToken($_COOKIE["lg-token"]))
				return true;
			
			$this->view->ViewError(403);
		}
		else if (in_array($url, $access["Admin"]))
		{
			return false; 
		}

		return false;
	}

	public function HasParams($names)
	{
		if ($this->route["params"] == [])
			return false; // exit("No required parameters");

		foreach ($names as $key => $value)
		{
			if (!array_key_exists($key, $this->route["params"]) && $value == "primary")
				return false;//exit("No required parameters");
		}

		return true;
	}

	public function Redirect($url)
	{
		header('location: /'.$url);
		exit();
	}
}

?>