<?php

namespace Application\Controllers;

use Application\Core\Controller;
use Application\Core\View;
use Application\Models\ContentModel;

class ContentController extends Controller
{
	protected $model; 

	public function __construct($route)
	{
		parent::__construct(
			$route,
			new View($route, "Default", [ "Content/main", "Main/main", "default" ], [ "Content/main", "default" ]),
			new ContentModel()
		);

		$this->args["theme"] = array_key_exists("theme", $_COOKIE) ? $_COOKIE["theme"] : "white";
		$this->args["user"] = $this->model->GetUserByToken($_COOKIE["lg-token"]);
	}

	public function PostAction()
	{
        /*$this->IsHaveParams([ "id" ]);

		$data = $this->model->GetPost($this->route["params"]["id"]);
		
		$data = json_decode($data["Text"], true);
		
	    $this->view->Render("Post", [ "blocks" => $data ]);*/
	}

	public function WritingAction()
	{
		if ($this->HasParams([ "edit" => "primary"]))
			$this->view->scripts[] = "Content/editing";
		else
			$this->view->scripts[] = "Content/writing";


		$this->view->scripts[] = "Content/selector-community";
		$this->view->scripts[] = "Content/selector-content-blocks";
		$this->view->scripts[] = "Tools/group-drop"; /* should be last */

		$this->view->styles[] = "Content/post-editor";
		$this->view->styles[] = "Content/writing";
		$this->view->styles[] = "Content/selector-community";
		$this->view->styles[] = "Content/selector-content-blocks";
		$this->view->styles[] = "Tools/group-drop";

		$this->view->Render("Writing", $this->args);
	}

	public function LoadDraftAction()
	{
		if (empty($_POST))
			exit("The post array was not set!");

		echo json_encode([ "index" => $this->model->LoadDraft($_POST["post"], $_POST["community"])["id_Post"]]);
	}

	public function UpdatePostAction()
	{
		if (empty($_POST))
			exit("The post array was not set!");

		$this->model->UpdatePost($_POST["postIndex"], $_POST["post"], $_POST["community"]);
	}

	public function PublishPostAction()
	{
		if (empty($_POST))
			exit("The post array was not set!");

		$postIndex = $_POST["postIndex"];

		$this->UpdatePost();

		$this->model->PublishPost($postIndex);
	}

	public function LoadMediaAction()
	{
		if (empty($_FILES))
			exit("The files array was not set!");
			
		$files = [];

		foreach ($_FILES as $key => $value) 
		{
			$files[]["url"] = $this->model->CreateFile($value["tmp_name"]);
		}

		echo json_encode($files);
	}

	public function LoadMediaByUrlAction()
	{
		if (empty($_POST))
			exit("The post array was not set!");

		$file[]["url"] = $this->model->CreateFile($_POST["url"]);

		echo json_encode($file);
	}

	public function UnloadMediaByUrlAction()
	{
		if (empty($_POST))
			exit("The post array was not set!");

		$this->model->RemoveFile($_POST["url"]);
	}

	public function DownloadDraftsByRangeAction()
	{	
		if (empty($_POST))
			exit("The post array was not set!");

		echo json_encode($this->model->GetDraftsByRange($_COOKIE["lg-token"], $_POST["currentPos"], $_POST["quantity"]));
	}

	public function DownloadDraftByIndexAction()
	{
		if (empty($_POST))
			exit("The post array was not set!");
		
		echo json_encode($this->model->GetDraftByIndex($_POST["id"]));
	}

	public function DownloadInfoCurrentUserAction()
	{
		echo json_encode($this->model->GetInfoCurrentUser($_COOKIE["lg-token"]));
	}

	public function DraftAction()
	{
		if (!$this->HasParams([ "id" => "primary"]))
			exit("No required parameters");

		$this->args["draft"] = $this->model->GetDraftByIndex($this->route["params"]["id"]);
		$this->args["content"] = json_decode($this->args["draft"]["Content"], true);

		//debug($args["content"]);

		$this->view->styles[] = "Content/draft";
		$this->view->Render("Draft", $this->args);
	}

	public function DownloadCommunitiesAction()
	{
		echo json_encode($this->model->GetCommunities());
	} 
}

?>