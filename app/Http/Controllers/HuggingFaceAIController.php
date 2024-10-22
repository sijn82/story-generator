<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;
use App\Helpers\OpenAIHelper;

class HuggingFaceAIController extends Controller
{
    public function __construct()
    {
        $this->openAIHelper = new OpenAIHelper();
        $this->attempt = 0;
    }

    public function huggingFaceAIRequest($prompt, $schema = 'characters_mistral', $number_of_items = 3)
    {

        $body = json_encode([
            'model' => "mistralai/Mistral-Small-Instruct-2409",
            'messages' => [
                [
                    'role' => 'user',
                    'content' => $prompt
                ]
            ],
            'response_format' => [
                "type" => "json_object", 
                "value" => $this->openAIHelper->getJsonSchema($schema, $number_of_items)
            ],
            "max_tokens" => 1000,
            "stream" => false // determines whether we get the response as it is generated (in multiple responses) or wait for the response to be fully formed
        ], true);

        try {
            $response = Http::withToken(env("HUGGING_FACE_SERVERLESS_INFERENCE_API"))
                ->timeout(120)
                ->withBody($body)
                ->post('https://api-inference.huggingface.co/models/mistralai/Mistral-Small-Instruct-2409/v1/chat/completions');


                // \Log::debug($response);
                $response = json_decode($response);
                // \Log::debug($response->choices[0]->message->content);

                if ($response->choices[0]->message->content !== "{}") {
                    return json_decode($response->choices[0]->message->content);
                } elseif ($this->attempt < 5) {
                    $this->attempt++;
                    return $this->huggingFaceAIRequest($prompt, $schema, $number_of_items);
                } else {
                    return null;
                }
        
                return json_decode($response->choices[0]->message->content);

        } catch (\Exception $e) {
            \Log::error($e);
            return $e;
        }
    }
}