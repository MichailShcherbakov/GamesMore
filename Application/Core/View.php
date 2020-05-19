<?php

namespace Application\Core;

class View 
{
	protected $path;
	protected $route;
	public $layout;
	public $styles;
	public $scripts;

	public function __construct($route, $layout = "Default", $styles = [],  $scripts = [])
	{
		$this->route = $route;
		$this->layout = $layout;
		$this->styles = $styles;
		$this->scripts = $scripts;
		$this->path = ucfirst($route["controller"])."/".ucfirst($route["action"]);
	}

	public function Render($title, $var = [])
	{
		extract($var);

		ob_start();

		$view = "Application/Views/".$this->path.".php";

		if (!file_exists($view))
			exit("File was not found: $view");

		include $view;

		$TITLE = $title;
		$STYLES = $this->styles;
		$SCRIPTS = $this->scripts;
		$CONTENT = ob_get_clean();

		$layout = "Application/Views/Layouts/".$this->layout.".php";

		if (!file_exists($layout))
			exit("File was not found: $layout");

		include $layout;
	}

	public function ViewError($error)
	{
		http_response_code($error);

		$this->path = "Errors/".$error;

		$this->Render("Error ".$error);
	}
}

?>