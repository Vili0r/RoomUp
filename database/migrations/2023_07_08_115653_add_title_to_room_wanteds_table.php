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
        Schema::table('room_wanteds', function (Blueprint $table) {
            $table->string('title');
            $table->text('description');
            $table->string('budget');
            $table->string('searching_for');
            $table->date('live_at')->nullable();
            $table->boolean('available')->default(0);
            $table->string('age')->nullable();
            $table->string('smoker')->nullable();
            $table->string('pets')->nullable();
            $table->string('occupation')->nullable();
            $table->string('gender')->nullable();
            $table->string('second_gender')->nullable();
            $table->json('hobbies')->nullable();
            $table->text('images');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('room_wanteds', function (Blueprint $table) {
            //
        });
    }
};
