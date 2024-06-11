<?php

namespace App\Http\Controllers;
use Inertia\Inertia;


class DashboardController extends Controller
{
    public function display()
    {
        $user = auth()->user();
        $characters = $user->characters;
        
        return Inertia::render('Dashboard', [
            'characters' => $characters,
        ]);
    }
}
