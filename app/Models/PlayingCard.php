<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlayingCard extends Model
{
    use HasFactory;

    protected $fillable = [
        'card_deck_id',
        'suit',
        'value',
        'in_play'
    ];

    protected $casts = [
        'in_play' => 'boolean'
    ];

    public function cardDeck()
    {
        return $this->belongsTo(CardDeck::class, 'card_deck_id');
    }
}
