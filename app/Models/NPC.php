<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NPC extends Model
{
    use HasFactory;

    protected $fillable = [
        'story_id',
        'profile_id',
        'inventory_id',
    ];

    protected $table = 'npcs';

    protected $with = ['profile', 'inventory'];

    public function story()
    {
        return $this->belongsTo(Story::class);
    }

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }

    public function inventory()
    {
        return $this->belongsTo(Inventory::class);
    }
}
