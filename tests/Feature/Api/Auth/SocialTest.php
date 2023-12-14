<?php

use App\Models\User;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;

it('handles social login and returns user with token', function () {
    $fakeSocialUser = new SocialiteUser();
    $fakeSocialUser->setRaw([
        'id' => '1234',
        'name' => 'John Doe',
        'email' => 'johndoe@example.com',
        'avatar' => 'http://example.com/avatar.jpg',
    ])->map([
        'id' => '1234',
        'name' => 'John Doe',
        'email' => 'johndoe@example.com',
        'avatar' => 'http://example.com/avatar.jpg',
        'token' => 'fake_token',
        'refreshToken' => 'fake_refresh_token',
    ]);

    // Ensure that the driver method is called with 'google' and then set up the remaining mocks
    Socialite::shouldReceive('driver')->with('google')->andReturnSelf();
    Socialite::shouldReceive('stateless')->andReturnSelf();
    Socialite::shouldReceive('userFromToken')->with('fake_token')->andReturn($fakeSocialUser);

    $response = $this->postJson('/api/auth/google/social-login', [
        'token' => 'fake_token',
        'device_name' => 'test_device',
    ]);

    // Assertions
    $response->assertStatus(201);
    $response->assertJsonStructure([
        'token',
        'user' => ['id', 'first_name', 'email', 'avatar'],
    ]);

    // Optionally, verify that a user record was created
    $user = User::where('email', 'johndoe@example.com')->first();
    expect($user)->not()->toBeNull();
    expect($user->first_name)->toEqual('John Doe');
});