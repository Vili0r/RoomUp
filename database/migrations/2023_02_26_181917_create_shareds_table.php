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
        Schema::create('shareds', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('type');
            $table->string('size');
            $table->string('available_rooms');
            $table->string('current_occupants');
            $table->text('what_i_am');
            $table->date('live_at')->nullable();
            $table->boolean('featured')->default(0);
            $table->boolean('available')->default(0);
            $table->foreignId('user_id')->constrained();
            $table->string('current_flatmate_age')->nullable();
            $table->string('current_flatmate_smoker')->nullable();
            $table->string('current_flatmate_pets')->nullable();
            $table->string('current_flatmate_occupation')->nullable();
            $table->string('current_flatmate_gender')->nullable();
            $table->json('current_flatmate_hobbies')->nullable();
            $table->text('images');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shareds');
    }
};
