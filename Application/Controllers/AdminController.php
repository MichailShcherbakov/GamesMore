<?php

namespace Application\Controllers;

use Application\Core\Controller;
use Application\Models\AdminModel;

class AdminController extends Controller
{
	protected $model;

	public function __construct($route)
	{
		parent::__construct($route);

		$this->model = new AdminModel();
		//$this->view->layout = "Admin";
		$this->view->styles = [ "Admin/main", "Main/main" ];
	}

	public function PanelAction()
	{
		$this->view->Render("Panel");
	}

	public function PostsAction()
	{
		$this->view->Render("Posts");
	}

	public function CreatePostAction()
	{
		$this->view->Render("Creating post...");
	}

	public function LoadPostAction()
	{
		if (!isset($_POST))
			exit("POST is not set");

		$this->model->LoadPost($_POST);
	}

	public function LoadFileAction()
	{
		$arrayImages = [];
		for ($i = 1; $i <= 20; $i++)
		{
			$image = $this->model->GetImages($i);
			$arrayImages[$i] = $image;
		}
		
		$this->view->Render("Gallery", [ "arrayImages" => $arrayImages ]);
	}
}

?>