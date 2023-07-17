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
        Schema::create('roommates', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('budget');
            $table->string('searching_for');
            $table->string('room_size');
            $table->string('area');
            $table->string('city');
            $table->date('live_at')->nullable();
            $table->boolean('available')->default(0);
            $table->string('age');
            $table->string('smoker');
            $table->string('pets');
            $table->string('occupation');
            $table->string('gender');
            $table->text('images');
            $table->foreignId('user_id')->constrained();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roommates');
    }
};
