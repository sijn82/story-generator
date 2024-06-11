<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CardDeck extends Model
{
    use HasFactory;


    public function playingCards()
    {
        return $this->hasMany(PlayingCard::class);
    }


}
