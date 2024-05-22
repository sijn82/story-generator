<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    // relationships

    public function character()
    {
        return $this->belongsTo(Character::class);
    }

    public function items()
    {
        return $this->hasMany(Item::class);
    }

    // actions

    public function add(Item $item, int $quantity = 1)
    {
    
        $this->items()->attach($item->id, ['quantity' => $quantity]);
    }

    public function alter(Item $item, int $quantity = 1)
    {
        $this->items()->updateExistingPivot($item->id, ['quantity' => $quantity]);
    }

    public function remove(Item $item)
    {
        $this->items()->detach($item->id);
    }


}
