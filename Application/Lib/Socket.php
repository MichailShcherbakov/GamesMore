<?php

namespace Application\Lib;

class Socket 
{
    protected $address;
    protected $port;
    protected $socket;

    public function __construct()
    {
    }

    public function __destruct()
    {
    }

    public function Connect($address = "127.0.0.1", $port = "666")
    {
        $this->address = $address;
        $this->port = $port;
        $this->socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);

        if ($this->socket === false) 
            exit("Socket was not created");

        $result = socket_connect($this->socket, $this->address, $this->port);

        if ($result === false)
            exit("Error connect");
    }

    public function Close()
    {
        socket_close($this->socket);
    }

    public function Send($data, $size)
    {
        //debug(pack("L", $size));
        socket_write($this->socket, pack("L", $size), 4);
        socket_write($this->socket, $data, $size);
    }

    public function GetSize()
    {
        return socket_read($this->socket, 4);
    }

    public function Get()
    {
        $size = $this->GetSize();
        $size = unpack("I", $size)[1];
        //debug($size);

        $iter = 0;
        $data = "";
        //while ($iter < $size) 
       // {
        $data .= socket_read($this->socket, $size - $iter);
        $iter += strlen($data);

       // echo '<img src="data:image/jpeg;base64,'.base64_encode($data).'"/>';
        //}

        return $data;
    }
}

?>