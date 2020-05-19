<?php

namespace Application\Controllers;

use Application\Core\Controller;
use Application\Core\View; 
use Application\Models\AccountModel;

class AccountController extends Controller
{

	public function __construct($route)
	{
		parent::__construct(
			$route,
			new View($route, "Default", [ "Account/main", "Main/main", "default" ], [ "Account/main", "default"  ]),
			new AccountModel()
		);

		$this->args["theme"] = array_key_exists("theme", $_COOKIE) ? $_COOKIE["theme"] : "white";
	}

	public function LoginAction()
	{
		if (empty($_POST))
			exit("Post is empty");

		setcookie("lg-token", null, time() - 3600, "/");	

		if (!$this->model->IsRegistered($_POST["email"], $_POST["password"]))
		{
			$this->view->ViewError(303);
		}

		$this->model->GiveToken($_POST["email"], $_POST["password"]);

		$token = $this->model->GetLastUserToken($_POST["email"], $_POST["password"]);

		setcookie("lg-token", $token["Hash"], time() + 60 * 60 * 24 * 30 * 365, "/");
	}

	public function LogoutAction()
	{
		setcookie("lg-token", null, time() - 3600, "/");
	}

	public function UserAction()
	{
		$this->args["user"] = $this->model->GetUserByToken($_COOKIE["lg-token"]);
		$this->args["numberDrafts"] = $this->model->NumberDrafts($_COOKIE["lg-token"]);

		$this->view->Render($this->args["user"]["Username"], $this->args);
	}

	public function RegisterAction()
	{
	}

	public function DraftsAction()
	{
		$this->args["user"] = $this->model->GetUserByToken($_COOKIE["lg-token"]);
		$this->args["numberDrafts"] = $this->model->NumberDrafts($_COOKIE["lg-token"]);

		$this->view->scripts[] = "Account/drafts";
		$this->view->Render($this->args["user"]["Username"], $this->args);
	}

	public function SettingsAction()
	{
		$this->args["user"] = $this->model->GetUserByToken($_COOKIE["lg-token"]);
		$this->args["numberDrafts"] = $this->model->NumberDrafts($_COOKIE["lg-token"]);

		$this->view->Render($this->args["user"]["Username"], $this->args);
	}
}

?>