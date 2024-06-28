<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\HighScore;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class HighScoreController extends Controller
{
    public function store(Request $request)
    {

        Log::info($request);

        $data = request()->validate([
            'user_id' => 'integer|nullable',
            'type' => 'required',
            'score' => 'required',
            'name' => 'required',
        ]);

        Log::info($data);

       $highscore = HighScore::create($data);

       Log::info($highscore);

        return redirect()->back();
    }

   
  
}