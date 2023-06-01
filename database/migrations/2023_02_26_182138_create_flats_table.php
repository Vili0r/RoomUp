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
        Schema::create('flats', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('cost');
            $table->string('deposit');
            $table->string('size');
            $table->string('type');
            $table->date('live_at')->nullable();
            $table->string('what_i_am');
            $table->string('furnished');
            $table->boolean('featured')->default(0);
            $table->boolean('available')->default(0);
            $table->foreignId('user_id')->constrained();
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
        Schema::dropIfExists('flats');
    }
};
