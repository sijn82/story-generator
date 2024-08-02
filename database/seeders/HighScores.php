<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\HighScore;

class HighScores extends Seeder
{
    public function run()
    {
        $highScores = [
            ['user_id' => null, 'type' => 'blackjack', 'score' => 5100, 'name' => 'Helen Gibson'],
            ['user_id' => null, 'type' => 'blackjack', 'score' => 5200, 'name' => 'Bass Reeves'],
            ['user_id' => null, 'type' => 'blackjack', 'score' => 5300, 'name' => 'George Scarborough'],
            ['user_id' => null, 'type' => 'blackjack', 'score' => 5400, 'name' => 'Jessie James'],
            ['user_id' => null, 'type' => 'blackjack', 'score' => 5500, 'name' => 'Wyatt Earp'],
            ['user_id' => null, 'type' => 'blackjack', 'score' => 5600, 'name' => 'Annie Oakley'],
            ['user_id' => null, 'type' => 'blackjack', 'score' => 5700, 'name' => 'Buth Cassidy'],
            ['user_id' => null, 'type' => 'blackjack', 'score' => 5800, 'name' => 'Buffalo Bill'],
            ['user_id' => null, 'type' => 'blackjack', 'score' => 5900, 'name' => 'Wild Bill Hickok'],
            ['user_id' => null, 'type' => 'blackjack', 'score' => 6000, 'name' => 'Billy the Kid'],
        ];

        foreach ($highScores as $highScore) {
            HighScore::create($highScore);
        }
    }
}