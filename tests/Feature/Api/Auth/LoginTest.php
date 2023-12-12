<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

it('logs in an existing user and returns a token', function () {
    // Arrange: Create a user
    $user = User::factory()->create([
        'email' => 'test@example.com',
        'password' => Hash::make('password'),
    ]);

    // Act: Attempt to log in
    $response = $this->postJson('/api/login', [
        'email' => 'test@example.com',
        'password' => 'password',
        'device_name' => 'test-device',
    ]);

    // Assert: Check if login was successful and token was returned
    $response->assertStatus(201)
             ->assertJsonStructure([
                 'token',
                 'user' => ['id', 'first_name', 'email', 'avatar'],
             ]);

    expect($response->json('user.email'))->toBe('test@example.com');
});

it('does not log in a user with incorrect credentials', function () {
    // Arrange: Create a user
    $user = User::factory()->create([
        'email' => 'test@example.com',
        'password' => Hash::make('password'),
    ]);

    // Act & Assert: Attempt to log in with incorrect password and expect a validation exception
    $this->withoutExceptionHandling();
    expect(fn() => $this->postJson('/api/login', [
        'email' => 'test@example.com',
        'password' => 'wrong-password',
        'device_name' => 'test-device',
    ]))->toThrow(ValidationException::class);
});