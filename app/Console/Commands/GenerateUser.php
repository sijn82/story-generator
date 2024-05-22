<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use function Laravel\Prompts\text;
use function Laravel\Prompts\password;
use function Laravel\Prompts\info;

class GenerateUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:user';

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

        // generate a user
        $name = text(
            label: 'What is your name?',
            required: 'Your name is required.'
        );
        $email = text(
            label: 'What is your email?',
            required: 'Your email is required.'
        );
        $password = password(
            label: 'Choose your password?',
            placeholder: 'password',
            hint: 'Minimum 8 characters.'
        );

        // if we've got a user, password and scenario we can save the user/scenario to the database
        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => $password,
        ]);

        info("User created successfully. Please use this id: $user->id to generate a scenario.");
    }
}
