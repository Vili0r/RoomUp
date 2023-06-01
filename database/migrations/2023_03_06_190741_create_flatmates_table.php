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
        Schema::create('flatmates', function (Blueprint $table) {
            $table->id();
            $table->string('new_flatmate_min_age');
            $table->string('new_flatmate_max_age');
            $table->string('new_flatmate_smoker');
            $table->string('new_flatmate_pets');
            $table->boolean('new_flatmate_references')->default(0);
            $table->boolean('new_flatmate_couples')->default(0);
            $table->string('new_flatmate_occupation');
            $table->string('new_flatmate_gender');
            $table->json('new_flatmate_hobbies')->nullable();
            $table->morphs('owner');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flatmates');
    }
};
