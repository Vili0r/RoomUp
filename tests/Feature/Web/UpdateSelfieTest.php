<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\UserVerification;
use Illuminate\Support\Facades\Storage;

uses( RefreshDatabase::class);

it('does not allow unauthenticated user to verify selfie', function() {
    $response = $this->post(route('profile-seflie-verification.update'));

    $response->assertStatus(302);
});

it('uploads selfie and updates verification', function () {
    // Given
    Storage::fake('public');
    $user = User::factory()
        ->has(UserVerification::factory(), 'verification')
        ->create();

    actingAs($user)
        ->post(route('profile-seflie-verification.update'), [
            'selfie' => 'selfie.jpg',
        ]);

    // Then
    $user->refresh(); 
    $this->assertNotNull($user->verification->selfie_verified_at);
});

it('does not upload selfie if no selfie is provided', function () {
    // Given
    Storage::fake('public');
    $user = User::factory()
        ->has(UserVerification::factory(), 'verification')
        ->create();

    $this->actingAs($user);
    $response = actingAs($user)->post(route('profile-seflie-verification.update'), []);

    // Then
    $response->assertStatus(200); // Assuming it returns a blank response
    $user->refresh();
    $this->assertNull($user->verification->selfie_verified_at);
    Storage::disk('public')->assertMissing($user->verification->selfie);
});
