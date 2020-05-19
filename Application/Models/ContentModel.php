<?php

namespace Application\Models;

use Application\Core\Model;

class ContentModel extends Model
{
	public function __construct()
	{
		parent::__construct();
    }
    
    public function GetPost($id)
    {
        return $this->db->fetchAll("CALL GetPost(:id);", [ "id" => $id ])[0];
    }

    public function LoadDraft($content, $community)
	{
		$args = 
		[
            "token" => $_COOKIE["lg-token"],
			"content" => $content,
			"community" => $community,
		];

		return $this->db->fetchAll("CALL AddDraftByToken(:content, :token, :community);", $args)[0]; // [0] because it returns index of created draft post
    }

    public function UpdatePost($index, $content, $community)
	{
		$args = 
		[
            "index" => $index,
			"content" => $content,
			"community" => $community,
		];

		$this->db->fetchAll("CALL EditPost(:index, :content, :community);", $args); 
    }

    public function PublishPost($index)
	{
		$args = 
		[
            "index" => $index,
		];

		$this->db->fetchAll("CALL PublishPost(:index);", $args); 
    }
    
    public function CreateFile($url)
    {
        if (!isset($url))
            return;

        $path = "/Public/img/posts/" . bin2hex(random_bytes(12));

        copy($url, ".$path");
        
        return $path;
	}

	public function RemoveFile($url)
	{
		if (!isset($url))
			return;
			
		unlink(".$url");
	}
	
	public function GetDraftsByRange($token, $startIndex, $quantity)
	{
		$args = 
        [
			"token" => $token, 
			"startIndex" => $startIndex,
			"quantity" => $quantity
        ];

        return $this->db->fetchAll("CALL GetDraftsByRange(:token, :startIndex, :quantity)", $args);
	}

	public function GetDraftByIndex($idnex)
	{
		$args = 
        [
			"token" => $_COOKIE["lg-token"],
            "index" => $idnex, 
        ];

		$result = $this->db->fetchAll("CALL GetPostByIndexAndToken(:token, :index)", $args);

        return count($result) == 0 ? $result : $result[0];
	}

	public function GetCommunities()
	{
		return $this->db->fetchAll("CALL GetCommunities()");
	}

	public function GetInfoCurrentUser($tokenHash)
    {
        $args = [
            "tokenHash" => $tokenHash, 
        ];

        return $this->db->fetchAll("CALL GetUserByToken(:tokenHash)", $args)[0];
	}
}

?>