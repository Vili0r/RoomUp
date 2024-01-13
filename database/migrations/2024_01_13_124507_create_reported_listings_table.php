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
        Schema::create('reported_listings', function (Blueprint $table) {
            $table->id();
            $table->string('contact_name');
            $table->string('email');
            $table->string('reason');
            $table->text('details')->nullable();
            $table->string('status');
            $table->morphs('owner');
            $table->timestamp('resolved_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reported_listings');
    }
};
