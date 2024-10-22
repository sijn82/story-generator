<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Http\Controllers\OpenAIController;
use App\Http\Controllers\HuggingFaceAIController;

use App\Models\Profile;
use App\Models\Scenario;

use function Laravel\Prompts\text;
use function Laravel\Prompts\password;
use function Laravel\Prompts\select;
use function Laravel\Prompts\info;

class GenerateScenario extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:scenario';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate three scenarios and choose one';

    /**
     * Execute the console command.
     */
    public function handle()
    {

        $scenario_prompt =  "Act as an AI supporting fiction writers in crafting extraordinary stories. Generate 3 story scenarios for an interactive roleplaying game using the provided JSON schema to shape your response. 
                            The scenarios should be unique and interesting, including a title and a brief description. For inspiration, think about the tales you might find in a fantasy, science fiction, or Lovecraftian horror story.";

        
        // // create an instance of the OpenAIController (not my usual approach)
        // $openAIController = new OpenAIController();
        $huggingFaceController = new HuggingFaceAIController();

        // generate the scenarios
        // $scenarios_response = $openAIController->openAIRequest("scenario", 3, $scenario_prompt);
        $scenarios_response = $huggingFaceController->huggingFaceAIRequest($scenario_prompt, "scenarios_mistral", 3);
        $scenario_titles = [];
        

        if (!isset($scenarios_response->scenarios)) {
            info("No scenarios were generated. Please try again.");
            dump($scenarios_response);
            return;

        }

        $scenarios = $scenarios_response->scenarios;

        foreach ($scenarios as $scenario) {
            $scenario_titles[] = $scenario->title;
        }

        // select a scenario
        $selected_scenario = select(
            label: 'Select a scenario',
            options: $scenario_titles
        );

        // get the description of the selected scenario
        $scenario_description = array_values(array_filter($scenarios, function ($scenario) use ($selected_scenario) {
            return $scenario->title === $selected_scenario;
        }));

        // dd($scenario_description);

        info("You selected: $selected_scenario");
        info("Description: " . $scenario_description[0]->description);
        info("Thank you for using the scenario generator.  Now you need a character to play the storyline as.");

        $scenario = Scenario::create([
            'title' => $selected_scenario,
            'description' => $scenario_description[0]->description,
        ]);

        info("Generating a story for your scenario...");

        $story = $scenario->stories()->create([
            'progress' => 0,
        ]);

        return info("This is your story id: $story->id");

    }
}
