<?php

namespace Application\Lib;

use PDO;

class Database 
{
	protected $handle;
	protected $config;

	public function __construct()
	{
		$this->config = include "Application/Config/Db.php";

		$this->handle = new PDO("mysql:host=".$this->config["host"].";dbname=".$this->config["database"], 
			$this->config["username"], 
			$this->config["password"]);
	}

	public function query($sql, $args = [])
	{
		$query = $this->handle->prepare($sql);

		if (!empty($args))
		{
			foreach ($args as $key => $value)
			{
				$query->bindValue(':'.$key, $value);
			}
		}

		$query->execute();

		return $query;
	}

	public function fetchAll($sql, $args = [])
	{
		$query = $this->query($sql, $args);
		return $query->fetchAll(PDO::FETCH_ASSOC);
	}
}

?>