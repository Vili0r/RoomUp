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
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('sub_title')->nullable();
            $table->text('sub_description')->nullable();
            $table->string('room_size');
            $table->string('room_cost');
            $table->string('room_deposit')->nullable();
            $table->string('room_furnished')->nullable();
            $table->boolean('room_references')->default(0)->nullable();
            $table->date('available_from');
            $table->string('minimum_stay');
            $table->string('maximum_stay');
            $table->string('days_available')->nullable();
            $table->boolean('short_term')->default(0);
            $table->boolean('available')->default(0);
            $table->date('live_at')->nullable();
            $table->text('images')->nullable();
            $table->morphs('owner');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
