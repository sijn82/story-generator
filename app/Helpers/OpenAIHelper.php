<?php

namespace App\Helpers;

use App\Helpers\JSONSchemas;

class OpenAIHelper 
{

    public function __construct() 
    {
        $this->jsonSchemas = new JSONSchemas();
    }

    public function getJsonSchema($schema, $number_of_items) 
    {
        switch ($schema) {
            case "scenario":
                return $this->jsonSchemas->scenarios($number_of_items);
            case "character":
                return $this->jsonSchemas->characters($number_of_items);
        }
    }

}