<?php

namespace Application\Models;

use Application\Core\Model;

class AccountModel extends Model
{
	public function __construct()
	{
		parent::__construct();
	}

	public function IsRegistered($email, $password)
	{
		$params = [ 
			"userHash" => strtolower($email).$password, 
		];

		$result = $this->db->fetchAll("CALL GetUserByHash(md5(:userHash));", $params);

		return !empty($result);
	}

	public function IsAdmin($email, $password)
	{
		$params = [ 
			"userHash" => strtolower($email).$password, 
		];

		$result = $this->db->fetchAll("CALL GetUserByHash(md5(:userHash));", $params);

		return !empty($result) && $result[0]["Privilege"] == "Admin";
	}

	public function GetUserByHash($email, $password)
    {
        $args = [
            "userHash" => strtolower($email).$password, 
        ];

        return $this->db->fetchAll("CALL GetUserByHash(md5(:userHash))", $args)[0];
	}

	public function GetUserByToken($tokenHash)
    {
        $args = [
            "tokenHash" => $tokenHash, 
        ];

        return $this->db->fetchAll("CALL GetUserByToken(:tokenHash)", $args)[0];
	}

	public function GetLastUserToken($email, $password)
	{
		$args = [
			"userHash" => strtolower($email).$password,
		];

		return $this->db->fetchAll("CALL GetLastUserToken(md5(:userHash))", $args)[0];
	}
	
	public function GiveToken($email, $password)
	{
		$args = [
            "userHash" => strtolower($email).$password, 
		];

        $this->db->fetchAll("CALL GiveToken(md5(:userHash))", $args);
	}

	public function NumberDrafts($token)
	{
		$args = [
            "tokenHash" => $token, 
        ];

        return $this->db->fetchAll("CALL GetNumberDraftsByToken(:tokenHash)", $args)[0]["Number"];
	}
}

?>