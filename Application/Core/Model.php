<?php


namespace Application\Core;

use Application\Lib\Database;

class Model 
{
	protected $db;

	public function __construct()
	{
		$this->db = new Database();
	}
	
	public function IsValidToken($token)
	{
		$args = 
        [
            "tokenHash" => $token, 
        ];

        return !empty($this->db->fetchAll("CALL GetUserByToken(:tokenHash)", $args)[0]);	
	}

	public function GetUserByToken($token)
    {
        $args = 
        [
            "tokenHash" => $token, 
        ];

        return $this->db->fetchAll("CALL GetUserByToken(:tokenHash)", $args)[0];
	}
}

?>