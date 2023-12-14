<?php

namespace Tests\Feature;

use App\Models\User;

it('returns user information and verification status', function () {
    // Create a user
    $user = User::factory()->create();

    // Optionally verify the user's email
    // $user->markEmailAsVerified(); // Uncomment if you want to test with a verified email

    // Act as this user and make the request
    $response = actingAs($user)->getJson('/api/profile');

    // Assert the response is correct
    $response->assertStatus(200);
});

it('updates the profile information', function() {
    $user = User::factory()->create();
    $timestamp = time();

    $response = $this
        ->actingAs($user)
        ->putJson('/api/profile', [
            'first_name' => 'Test User',
            'email' => 'test'.$timestamp.'@example.com',
        ]);

    $response
        ->assertSessionHasNoErrors();

    $user->refresh();
    expect($user->first_name)->toEqual('Test User');
    expect($user->email)->toEqual('test'.$timestamp.'@example.com');
    expect($user->email_verified_at)->toBeNull(); 
});

it('tests email verification status is unchanged when the email address is unchanged', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->put('/api/profile', [
            'name' => 'Test User',
            'email' => $user->email,
        ]);

    $response
        ->assertSessionHasNoErrors();

    $user->refresh();

    expect($user->email_verified_at)->not()->toBeNull();
});

it('makes sure user can delete their account', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->delete('/api/profile', [
            'password' => 'password',
        ]);

    $response
        ->assertSessionHasNoErrors();

    expect($user->fresh())->toBeNull();
});

it('tests correct password must be provided to delete account', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->delete('/api/profile', [
            'password' => 'wrong-password',
        ]);

    $response
        ->assertSessionHasErrors('password');

    expect($user->email_verified_at)->not()->toBeNull();
});