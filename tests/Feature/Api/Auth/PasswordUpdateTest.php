<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

it('updates the user password', function () {
    // Create a user with a known password
    $user = User::factory()->create([
        'password' => Hash::make('L3NHn8!989')
    ]);

    // The new password data
    $data = [
        'current_password' => 'L3NHn8!989',
        'password' => 'M3DRj8!989',
        'password_confirmation' => 'M3DRj8!989'
    ];

    // Act as this user and make the request
    $response = actingAs($user)->putJson('/api/password', $data);

    // Assert the response is correct
    $response->assertStatus(201);

    // Assert the password was updated
    $user->refresh();
    expect(Hash::check('M3DRj8!989', $user->password))->toBeTrue();
});

it('tests correct password must be provided to update password', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->putJson('/api/password', [
            'current_password' => 'wrong-password',
            'password' => 'M3DRj8!989',
            'password_confirmation' => 'M3DRj8!989',
        ]);

    $response
        ->assertStatus(422) // Assert that a validation error occurred
        ->assertJsonValidationErrors([
            'current_password' => 'The password is incorrect.'
        ]);
});