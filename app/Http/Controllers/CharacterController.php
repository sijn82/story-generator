<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Character;
use Illuminate\Http\Request;

class CharacterController extends Controller
{
    public function show($id)
    {

        $character = Character::find($id);
        
        return Inertia::render('Character', [
            
            'character' => $character,
        ]);
    }
}