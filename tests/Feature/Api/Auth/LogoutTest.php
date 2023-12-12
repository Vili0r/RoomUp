<?php

use App\Models\User;
use Laravel\Sanctum\Sanctum;

it('logs out a user by deleting the token', function () {
    // Create a user
    $user = User::factory()->create();

    // Act as this user
    $token = $user->createToken('TestToken')->plainTextToken;

    // Make the logout request with the token
    $response = $this->withHeaders([
        'Authorization' => 'Bearer ' . $token,
    ])->post('/api/logout');

    // Assert the response is successful
    $response->assertStatus(200);

    // Assert the token is deleted
    $this->assertDatabaseMissing('personal_access_tokens', [
        'tokenable_type' => User::class,
        'tokenable_id' => $user->id,
        'token' => explode('|', $token, 2)[1],
    ]);
});
