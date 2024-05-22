<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Http\Controllers\OpenAIController;
use App\Models\Profile;
use App\Models\Character;
use App\Models\Story;
use App\Models\User;
use App\Models\NPC;

use function Laravel\Prompts\text;
use function Laravel\Prompts\info;
use function Laravel\Prompts\select;

class GenerateCharacters extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:characters';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //

        $user_id = text(
            label: 'Please enter your user id', 
            hint: 'This will be used to create your personalised character.'
        );

        $story_id = text(
            label: 'Pleaser enter your story id', 
            hint: 'This will be used to attach your character to the story.'
        );

        if ($story_id) {
            $story = Story::findOrFail($story_id);
            $story->scenario->description;

            // $character_prompt = "Act as a character creator. Come up with 3 roleplaying character profiles to play as in an interactive roleplaying story. Use the provided JSON schema. The characters should be unique and interesting. Include a brief description of their physical appearance and a brief summary of their personality traits. Along with their age, profession and full name. For inspiration, think about the characters you might find in a story with the following description: " . $story->scenario->description;

            // $character_prompt = "Act as an AI supporting fiction writers in crafting extraordinary characters that delve deep into the human experience. Generate 3 character profiles using the provided JSON schema. The characters should be unique and interesting. Include a brief description of their physical appearance and a brief summary of their personality traits. Along with their age, profession and full name. With this artistic objective in mind, think about the characters you might find in a story with the following description: " . $story->scenario->description;

            $character_prompt = "Act as an AI supporting fiction writers in crafting extraordinary characters. Generate 3 character profiles using the provided JSON schema. The characters should be unique and interesting. Include a brief description of their physical appearance and a brief summary of their personality traits. Along with their age, profession and full name. With this artistic objective in mind, think about the characters you might find in a fantasy, science fiction, or Lovecraftian horror story with the following description: " . $story->scenario->description;

        } else {
            // the user didn't provide a story id so we'll just generate some less tailored characters
            $character_prompt = "Act as a character creator. Come up with 3 roleplaying character profiles to play as in an interactive roleplaying story. 
                            Use the provided JSON schema. The characters should be unique and interesting. 
                            Include a brief description of their physical appearance and a brief summary of their personality traits. 
                            Along with their age, profession and full name. For inspiration, think about the characters you might find in a fantasy, science fiction, or Lovecraftian horror story.";
        }

        

        // create an instance of the OpenAIController (not my usual approach)
        $openAIController = new OpenAIController();

        info($character_prompt);

        $characters_response = $openAIController->openAIRequest("character", 3, $character_prompt);
        $character_names = [];

        if (!isset($characters_response->characters)) {
            info("No characters were generated. Please try again.");
            dump($characters_response);
            return;
        }

        $characters = $characters_response->characters;

        foreach ($characters as $character) {
            $character_names[] = $character->name;
        }

        $selected_character = select(
            label: 'Select a character',
            options: $character_names
        );

        // This is a little lazy, I could create the all the profiles and then let the user select which profile they wish to attach.
        $character_description = array_values(array_filter($characters, function ($character) use ($selected_character) {
            return $character->name === $selected_character;
        }));

        $remaining_character_descriptions = array_values(array_filter($characters, function ($character) use ($selected_character) {
            return $character->name !== $selected_character;
        }));

        info("You selected: $selected_character");
        info("Appearance: " . $character_description[0]->appearance);
        info("Personality: " . $character_description[0]->personality);
        info("Age: " . $character_description[0]->age);
        info("Profession: " . $character_description[0]->profession);

        // player character
        $profile = Profile::create([
            'name' => $selected_character,
            'age' => $character_description[0]->age,
            'profession' => $character_description[0]->profession,
            'appearance' => $character_description[0]->appearance,
            'personality' => $character_description[0]->personality,
        ]);
        


        if ($story) {

            if ($user_id) {

                $user = User::findOrFail($user_id);

                $character = Character::create([
                    'user_id' => $user->id,
                    'story_id' => $story->id,
                    'profile_id' => $profile->id,
                ]);

                info("Character created successfully and placed into the story.");

            } else {
                info('No user id provided, unable to create personalised character but the profiles will still be stored.');
            }

        } else {
            info('No story id provided, unable to attach your character to the story but the profiles will still be stored.');
        }

        // remaining characters can be used as NPCs
        foreach ($remaining_character_descriptions as $character) {
            $profile = Profile::create([
                'name' => $character->name,
                'age' => $character->age,
                'profession' => $character->profession,
                'appearance' => $character->appearance,
                'personality' => $character->personality,
            ]);

            if ($story) {

                NPC::create([
                    'profile_id' => $profile->id,
                    'story_id' => $story->id,
                ]);
            }
        }


    }
}
