<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('playing_cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('card_deck_id')->constrained();
            $table->string('suit');
            $table->string('name');
            $table->integer('value');
            $table->boolean('in_play')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('playing_cards');
    }
};
