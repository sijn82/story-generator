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
            ['user_id' => null, 'type' => 'blackjack', 'score' => 5100, 'name' => 'John Doe'],
            ['user_id' => null, 'type' => 'blackjack', 'score' => 5200, 'name' => 'Jane Doe'],
            ['user_id' => null, 'type' => 'blackjack', 'score' => 5300, 'name' => 'John Smith'],
            ['user_id' => null, 'type' => 'blackjack', 'score' => 5400, 'name' => 'Jane Smith'],
            ['user_id' => null, 'type' => 'blackjack', 'score' => 5500, 'name' => 'John Johnson'],
            ['user_id' => null, 'type' => 'blackjack', 'score' => 5600, 'name' => 'Jane Johnson'],
            ['user_id' => null, 'type' => 'blackjack', 'score' => 5700, 'name' => 'John Brown'],
            ['user_id' => null, 'type' => 'blackjack', 'score' => 5800, 'name' => 'Jane Brown'],
            ['user_id' => null, 'type' => 'blackjack', 'score' => 5900, 'name' => 'John White'],
            ['user_id' => null, 'type' => 'blackjack', 'score' => 6000, 'name' => 'Jane White'],
        ];

        foreach ($highScores as $highScore) {
            HighScore::create($highScore);
        }
    }
}