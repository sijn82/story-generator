<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Scenario extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
    ];

    public function stories()
    {
        return $this->hasMany(Story::class);
    }
}
