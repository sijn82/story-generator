<?php

namespace App\Http\Controllers;

use OpenAI\Laravel\Facades\OpenAI;
use App\Helpers\OpenAIHelper;
use Illuminate\Support\Facades\Log;

class OpenAIController extends Controller 
{

    public function __construct() 
    {
        $this->openAIHelper = new OpenAIHelper();
        $this->attempt = 0;
    }

    public function openAIRequest($schema, $number_of_items, $prompt)
    {
        Log::info($schema);
        Log::info($number_of_items);
        Log::info($prompt);

        try {
            $response = OpenAI::chat()->create([
                'model' => 'gpt-3.5-turbo-1106',
                'messages' => [
                    ['role' => 'user', 'content' => $prompt],
                ],
                'response_format' => ["type" => "json_object"],
                "tools" => [
                    [
                        "type" => "function",
                        "function" => $this->openAIHelper->getJsonSchema($schema, $number_of_items)
                    ]
                ],
                "tool_choice" => "auto"
            ]);
    
            Log::info(json_encode($response));

            if ($response->choices[0]->message->toolCalls[0]->function->arguments !== "{}") {
                return json_decode($response->choices[0]->message->toolCalls[0]->function->arguments);
            } elseif ($this->attempt < 5) {
                $this->attempt++;
                return $this->openAIRequest($schema, $number_of_items, $prompt);
            } else {
                return null;
            }
    
            return json_decode($response->choices[0]->message->toolCalls[0]->function->arguments);
        
        } catch (\Exception $e) {
            Log::error($e);
            return $e;
        }

        

    }

}