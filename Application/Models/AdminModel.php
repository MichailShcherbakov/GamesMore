<?php

namespace Application\Models;

use Application\Core\Model;
use Application\Lib\Socket;

class AdminModel extends Model
{
	protected $socket;

	public function __construct()
	{
		parent::__construct();

		$this->socket = new Socket();
	}

	







	public function LoadImage($name, $path)
	{
		$msg = file_get_contents($path);

		$this->socket->Connect();
		$this->socket->Send($msg, strlen($msg));
		//debug($this->socket->Get());
		$this->socket->Close();
		//copy($path, "img/".$name);
	}

	public function GetImages($index)
	{
		$query = json_encode([ "Type" => "LOAD", "Index" => $index ]);
		//debug("Query: ".$query);

		$this->socket->Connect();
		$this->socket->Send($query, strlen($query));
		$data = $this->socket->Get();
		$this->socket->Close();

		return $data;
	}
}

?>