<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;
use App\Helpers\OpenAIHelper;

class HuggingFaceAIController extends Controller
{
    public function __construct()
    {
        $this->openAIHelper = new OpenAIHelper();
    }

    public function huggingFaceAIRequest($prompt)
    {
        $schema = "character";
        $number_of_items = 3;

        $body1 = json_encode([
            'model' => "mistralai/Mistral-Small-Instruct-2409",
            'messages' => [
                [
                    'role' => 'user',
                    'content' => $prompt
                ]
            ],
            'response_format' => ["type" => "json_object"],
            "tools" => [
                [
                    "type" => "function",
                    "function" => $this->openAIHelper->getJsonSchema($schema, $number_of_items)
                ]
            ],
            "tool_choice" => "auto"
        ], true);

        $body2 = '{
                 "model": "mistralai/Mistral-Small-Instruct-2409",
                 "messages": [{"role": "user", "content": "' . $prompt . '"}],
                 "max_tokens": 500,
                 "stream": false
             }';

        $body3 = '{
            "model": "mistralai/Mistral-Small-Instruct-2409",
            "messages": [{"role": "user", "content": "' . $prompt . '"}],
            "response_format": {"type": "json_object"}, 
        }';

        $body4 = json_encode([
            'model' => "mistralai/Mistral-Small-Instruct-2409",
            'messages' => [
                [
                    'role' => 'user',
                    'content' => $prompt
                ]
            ],
            'response_format' => [
                "type" => "json_object", 
                "value" => [
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
            ],
            "max_tokens" => 500,
            "stream" => false // determines whether we get the response as it is generated (in multiple responses) or wait for the response to be fully formed
        ], true);

        \Log::debug($body1);
        \Log::debug($body2);

        try {
            $response = Http::withToken(env("HUGGING_FACE_SERVERLESS_INFERENCE_API"))
                ->timeout(120)
                ->withBody($body4)
                ->post('https://api-inference.huggingface.co/models/mistralai/Mistral-Small-Instruct-2409/v1/chat/completions');

            // $response = Http::withBody('{
            //     "model": "mistralai/Mistral-Small-Instruct-2409",
            //     "messages": [{"role": "user", "content": "What is the capital of France?"}],
            //     "max_tokens": 500,
            //     "stream": false
            // }')
            //     ->withToken('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')
            //     ->post('https://api-inference.huggingface.co/models/mistralai/Mistral-Small-Instruct-2409/v1/chat/completions');

                \Log::debug($response);
                return $response;

        } catch (\Exception $e) {
            \Log::error($e);
            return $e;
        }
    }
}

// withBody('{    
//     "model": "mistralai/Mistral-Small-Instruct-2409",    
//     "messages": [{"role": "user", "content": '$prompt'}],    
//     "max_tokens": 500,    
//     "stream": false}'
//     )    
//     ->

// "tools" : [
//                     {
//                         "type": "function",
//                         "function": ' . json_encode($this->openAIHelper->getJsonSchema($schema, $number_of_items)) . '
//                     }
//                 ],
//                 "tool_choice": "auto"