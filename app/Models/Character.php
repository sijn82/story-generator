<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Character extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'story_id',
        'profile_id',
        'inventory_id',
    ];

    protected $with = ['user', 'story', 'profile', 'inventory'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

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
