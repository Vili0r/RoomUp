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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('phone_number')->unique()->nullable();
            $table->timestamp('mobile_verified_at')->nullable();
            $table->tinyInteger('mobile_attempts_left')->default(0);
            $table->timestamp('mobile_last_attempt_date')->nullable();
            $table->timestamp('mobile_verify_code_sent_at')->nullable();
            $table->string('mobile_verify_code')->nullable();
            $table->string('facebook_link')->nullable();
            $table->string('instagram_link')->nullable();
            $table->string('tiktok_link')->nullable();
            $table->string('linkedin_link')->nullable();
            $table->string('password');
            $table->string('avatar')->default('https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp');
            $table->string('gender')->nullable();
            $table->text('looking_for')->nullable();
            $table->date('birthdate')->nullable();
            $table->rememberToken();
            $table->timestamp('last_login_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
