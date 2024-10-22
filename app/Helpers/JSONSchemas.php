<?php

namespace App\Helpers;

class JSONSchemas
{
    // these 2 work with openAI but not with mistral (huggingface - despite what the documentation suggests)
    public function scenarios($number_of_items)
    {
        return [
            "name" => "scenarios",
            "description" => "An array of storyline scenarios.",
            "parameters" => [
                "type" => "object",
                "properties" => [
                    "scenarios" => [
                        "type" => "array",
                        "description" => "An array of scenarios for a game. The scenarios should be unique and interesting. Where the title is the title of the scenario and the description is a brief description of the scenario.",
                        "items" => [
                            "type" => "object",
                            "properties" => [
                                "title" => [
                                    "type" => "string",
                                    "description" => "The scenario title"
                                ],
                                "description" => [
                                    "type" => "string",
                                    "description" => "The scenario description"
                                ],
                            ],
                            "required" => ["title", "description"],
                        ],
                        "minItems" => $number_of_items,
                        "maxItems" => $number_of_items,
                        "uniqueItems" => true,
                    ],
                ],
                
            ],
            
        ];
    }

    public function characters($number_of_items)
    {
        return [
            "name" => "characters",
            "description" => "Some potential characters to play the storyline as.",
            "parameters" => [
                "type" => "object",
                "properties" => [
                    "characters" => [
                        "type" => "array",
                        "description" => "An array of character profiles for a story. The characters should be unique and interesting. Where the name is the full name of the character.",
                        "items" => [
                            "type" => "object",
                            "properties" => [
                                "name" => [
                                    "type" => "string",
                                    "description" => "The character's full name",
                                ],
                                "age" => [
                                    "type" => "integer",
                                    "description" => "The character's age",
                                ],
                                "profession" => [
                                    "type" => "string",
                                    "description" => "The character's profession",
                                ],
                                "personality" => [
                                    "type" => "string",
                                    "description" => "A brief description of their personality traits.",
                                ],
                                "appearance" => [
                                    "type" => "string",
                                    "description" => "A brief description of their physical appearance.",
                                ],
                            ],
                            "required" => [
                                "name", 
                                "age", 
                                "profession", 
                                "personality", 
                                "appearance"
                            ],
                        ],
                        "minItems" => $number_of_items,
                        "maxItems" => $number_of_items,
                        "uniqueItems" => true,
                    ],
                ],
                
            ],
            
        ];
    }

    public function scenarios_mistral($number_of_items)
    {
        return [
            "properties" => [
                "scenarios" => [
                    "type" => "array",
                    "description" => "An array of scenarios for a game. The scenarios should be unique and interesting. Where the title is the title of the scenario and the description is a brief description of the scenario.",
                    "items" => [
                        "type" => "object",
                        "properties" => [
                            "title" => [
                                "type" => "string",
                                "description" => "The scenario title"
                            ],
                            "description" => [
                                "type" => "string",
                                "description" => "The scenario description"
                            ],
                        ],
                        "required" => ["title", "description"],
                    ],
                    "minItems" => $number_of_items,
                    "maxItems" => $number_of_items,
                    "uniqueItems" => true,
                ],
            ],
        ];
    }

    public function characters_mistral($number_of_items)
    {
        return [
            "properties" => [
                "characters" => [
                    "type" => "array",
                    "description" => "An array of character profiles for a story. The characters should be unique and interesting. Where the name is the full name of the character.",
                    "items" => [
                        "type" => "object",
                        "properties" => [
                            "name" => [
                                "type" => "string",
                                "description" => "The character's full name",
                            ],
                            "age" => [
                                "type" => "integer",
                                "description" => "The character's age",
                            ],
                            "profession" => [
                                "type" => "string",
                                "description" => "The character's profession",
                            ],
                            "personality" => [
                                "type" => "string",
                                "description" => "A brief description of their personality traits.",
                            ],
                            "appearance" => [
                                "type" => "string",
                                "description" => "A brief description of their physical appearance.",
                            ],
                        ],
                        "required" => [
                            "name", 
                            "age", 
                            "profession", 
                            "personality", 
                            "appearance"
                        ],
                    ],
                    "minItems" => $number_of_items,
                    "maxItems" => $number_of_items,
                    "uniqueItems" => true,
                ],
            ],
        ];
    }
    
}