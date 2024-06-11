<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\CardDeck;

class TVSetController extends Controller
{

    public function __construct()
    {
        // $this->deck = new CardDeck(); // not yet, I'm happy to reuse the first card deck for now
        $this->deck = CardDeck::first();
    }

    public function show()
    {

        $deck = $this->deck->playingCards;

        return Inertia::render('TVSet', [
            'deck' => $deck,
            // 'playerHand' => $playerHand,
            // 'dealerHand' => $dealerHand,
            // 'playerScore' => $playerScore,
            // 'dealerScore' => $dealerScore,
            // 'playerBust' => $playerBust,
            // 'dealerBust' => $dealerBust,
            // 'playerBlackJack' => $playerBlackJack,
            // 'dealerBlackJack' => $dealerBlackJack,
            // 'playerWin' => $playerWin,
            // 'dealerWin' => $dealerWin,
            // 'draw' => $draw,
        ]);
    }
}