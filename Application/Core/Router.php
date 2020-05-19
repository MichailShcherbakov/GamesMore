<?php

	namespace Application\Core;

	use Application\Core\View;

	class Router
	{
		protected $routes = [];
		protected $params = [];

		public function __construct()
		{
			$routes = include "Application/Config/Routes.php";

			foreach ($routes as $url => $params) 
			{
				$this->Add($url, $params);
			}
		}

		public function Add($url, $params)
		{
			$url = "#^/??".$url."/??$#";
			$this->routes[$url] = $params;
		}

		public function Match()
		{
			$url = $_SERVER["REQUEST_URI"];

			$urlParams = parse_url($url, PHP_URL_QUERY );
			$url = parse_url($url, PHP_URL_PATH);

			$arrayUrlParams = [];

			if ($urlParams != null)
			{
				$urlParams = explode("&", $urlParams);

				foreach ($urlParams as $params)
				{
					$p = explode("=", $params);
					$arrayUrlParams[$p[0]] = $p[1];
				}
			}

			foreach ($this->routes as $route => $params) 
			{
				if (preg_match($route, $url))
				{
					$params["url"] = $url;
					$params["params"] = $arrayUrlParams;
					$this->params = $params;
					return true;
				}
			}

			return false;
		}

		public function Run()
		{
			if (!$this->Match())
			{
				$view = new View([ "controller" => "Main", "action" => "Index" ], "Default", [ "Main/main", "default" ], [ "Main/main", "default"  ]);
				$view->ViewError(404);
			}

			$controller = "Application\Controllers\\".ucfirst($this->params["controller"])."Controller";
			
			if (!class_exists($controller))
				exit("Controller was not found");

			$action = ucfirst($this->params["action"])."Action";

			if (!method_exists($controller, $action))
				exit("Action was not found");
			
			$con = new $controller($this->params);
			$con->$action();
		}
	}
?>