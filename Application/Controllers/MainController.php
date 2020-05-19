<?php

namespace Application\Controllers;

use Application\Core\Controller;
use Application\Core\View;
use Application\Models\MainModel;

class MainController extends Controller
{
	protected $model;

	public function __construct($route)
	{
		parent::__construct(
			$route,
			new View($route, "Default", [ "Main/main", "Main/auth-form", "default" ], [ "Main/main", "Main/auth-form", "default"  ]),
			new MainModel()
		);

		$this->args["theme"] = array_key_exists("theme", $_COOKIE) ? $_COOKIE["theme"] : "white";
	}

	public function IndexAction()
	{
		//$firstPosts = $this->model->UploadPosts(0, 10);

		if (isset($_COOKIE["lg-token"]) && $this->model->IsValidToken($_COOKIE["lg-token"]))
		{
			$this->args["user"] = $this->model->GetUserByToken($_COOKIE["lg-token"]);
		}

		$this->view->Render("Main", $this->args);
	}

	public function UploadAction()
	{
		if (!isset($_POST) || 
			!isset($_POST["currentPos"]) ||
			!isset($_POST["step"]))
			exit("Post is empty!");

		echo json_encode($this->model->UploadPosts($_POST["currentPos"], $_POST["step"]));
	}
}

?>