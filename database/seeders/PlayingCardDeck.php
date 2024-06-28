<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CardDeck;

class PlayingCardDeck extends Seeder
{
    /**
     * Run the database seeds.
     */


    protected $suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    protected $cardValues = [
        ["name" => '2', 'value' => 2],
        ["name" => '3', 'value' => 3],
        ["name" => '4', 'value' => 4],
        ["name" => '5', 'value' => 5],
        ["name" => '6', 'value' => 6],
        ["name" => '7', 'value' => 7],
        ["name" => '8', 'value' => 8],
        ["name" => '9', 'value' => 9],
        ["name" => '10', 'value' => 10],
        ["name" => 'J', 'value' => 10],
        ["name" => 'Q', 'value' => 10],
        ["name" => 'K', 'value' => 10],
        ["name" => 'A', 'value' => 11],
    ];
    
    public function run(): void
    {
        $deck = new CardDeck();
        $deck->name = 'Standard 52 Card Deck';
        $deck->description = 'A standard deck of 52 playing cards (minus the jokers).';
        $deck->save();

        foreach ($this->suits as $suit) {
            foreach ($this->cardValues as $card) {
                $deck->playingCards()->create([
                    'suit' => $suit,
                    'name' => $card['name'],
                    'value' => $card['value'],
                ]);
            }
        }
        
    }
}
