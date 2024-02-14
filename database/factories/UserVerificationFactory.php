<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserVerification>
 */
class UserVerificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'last_name_verified_at' => now(), 
            'email_verified_at' => auth()->check() ? now() : null, 
            'photo_verified_at' => null, 
            'selfie_verified_at' => null,
            'selfie' => null,
            'status' => 1
        ];
    }
}
