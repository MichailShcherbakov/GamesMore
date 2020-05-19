<?php

namespace Application\Models;

use Application\Core\Model;

class MainModel extends Model
{
	public function __construct()
	{
        parent::__construct();
    }
    
    public function UploadPosts($currentPos, $step)
    {
        $args = 
        [
            "currentPos" => $currentPos,
            "step" => $step,
        ];

        return $this->db->fetchAll("CALL GetPosts(:currentPos, :step)", $args);        
    }
}


?>