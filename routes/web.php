<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\OpenAIController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CharacterController;
use App\Http\Controllers\BlackJackController;
use App\Http\Controllers\HighScoreController;
use App\Http\Controllers\TVSetController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'display'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get("/scenarios", function () {
    $openAIController = new OpenAIController();
    return $openAIController->openAIRequest("scenario", 3, "Come up with some story scenarios for a game. Use the provided JSON schema. The scenarios should be unique and interesting. Where the title is the title of the scenario and the description is a brief description of the scenario.");
});

Route::get("portfolio", function() {
    return Inertia::render('Portfolio');
})->name('portfolio');

Route::get("/character/{id}", [CharacterController::class, 'show'])->name('character.show');

Route::get("/blackjack", [BlackJackController::class, 'start'])->name('blackjack.start');

Route::get("tvset", [TVSetController::class, 'show'])->name('tvset.show');
Route::get("farmer", function () {
    return Inertia::render('FarmerReplaced');
})->name("farmer.show");

Route::post("/highscore/store", [HighScoreController::class, 'store'])->name('highscore.store');
Route::get("/highscores/{type}", [HighScoreController::class, 'list'])->name('highscores.list');

require __DIR__.'/auth.php';
