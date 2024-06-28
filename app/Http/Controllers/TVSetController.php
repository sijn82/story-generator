<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\CardDeck;
use App\Models\HighScore;

class TVSetController extends Controller
{

    public function __construct()
    {
        // $this->deck = new CardDeck(); // not yet, I'm happy to reuse the first card deck for now
        $this->deck = CardDeck::first();
        // i'd rather this wasn't hardcoded to blackjack
        $this->high_scores = HighScore::where('type', 'blackjack')->orderBy('score', 'desc')->limit(10)->get();
    }

    public function show()
    {

        $deck = $this->deck->playingCards;

        return Inertia::render('TVSet', [
            'deck' => $deck,
            'high_scores' => $this->high_scores,
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