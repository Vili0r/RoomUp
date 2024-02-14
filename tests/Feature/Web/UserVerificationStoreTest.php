<?php

use App\Models\User;
use App\Models\UserVerification;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('does not allow unauthenticated user to update verify account', function() {
    $response = $this->post(route('verification.store'));

    $response->assertStatus(302);
});

it('redirects back with account verification pending status if all verifications are complete', function () {
    // Given
    $user = User::factory()
        ->has(UserVerification::factory(), 'verification') 
        ->create();

    // Mock authenticated user
    $this->actingAs($user);

    // Stub the user verification with all verifications complete
    $user->verification()->update([
        'last_name_verified_at' => now(),
        'email_verified_at' => now(),
        'phone_verified_at' => now(),
        'social_media_verified_at' => now(),
        'selfie_verified_at' => now(),
        'id_document_verified_at' => now(),
    ]);

    // Make a POST request to the store route
    $response = $this->post(route('verification.store'));

    $user->refresh();
    $user->load('verification');
    $this->assertEquals(3, $user->verification->status->value);
    $response->assertRedirect();
    $response->assertSessionHas('status', 'account-verification-pending');
});

it('redirects back with complete verification steps status if any verification is missing', function () {
    // Given
    $user = User::factory()
        ->has(UserVerification::factory(), 'verification') 
        ->create();

    // Mock authenticated user
    $this->actingAs($user);

    // Make a POST request to the store route
    $response = $this->post(route('verification.store'));

    // Assert that the response is a RedirectResponse
    $response->assertRedirect();
    $response->assertSessionHas('status', 'complete-verification-steps');
});
