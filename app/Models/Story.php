<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Story extends Model
{
    use HasFactory;

    protected $fillable = [
        'scenario_id',
        'progress',
    ];

    protected $with = ['scenario', 'npcs'];

    public function scenario()
    {
        return $this->belongsTo(Scenario::class);
    }

    public function characters()
    {
        return $this->hasMany(Character::class);
    }

    public function npcs()
    {
        return $this->hasMany(NPC::class);
    }

    public function events()
    {
        return $this->hasMany(Event::class);
    }
}
