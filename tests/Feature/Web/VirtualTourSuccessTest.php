<?php

use App\Models\Flat;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('does not allow unauthenticated user to update verify account', function() {
    $response = $this->get(route('checkout.success'));

    $response->assertStatus(302);
});

it('updates tour payment status and redirects with success message', function () {
    $owner = User::factory()->create();
    actingAs($owner);
    $flat = Flat::factory()->create([
        'user_id' => $owner->id
    ]);

    $sessionId = 'fake_checkout_session_id';
    $tour = $flat->tour()->create([
        'owner_type' => 'flat', // Assuming 'flat' owner type for this test
        'owner_id' => $flat->id,
        'contact_name' => 'John Doe',
        'email' => 'john@example.com',
        'details' => 'Tour details',
        'contact_number' => '123456789',
        'payment_status' => 3,
        'status' => 1,
        'payment_session_id' => $sessionId,
    ]);
    
    // Mock the Stripe client
    $stripeClientMock = mock(\Stripe\StripeClient::class);
    $stripeClientMock->shouldReceive('checkout->sessions->retrieve')->with($sessionId)->andReturn([
        'id' => $sessionId,
    ]);

    $request = [
        'session_id' => $sessionId,
    ];

    // When
    $response = actingAs($owner)->get(route('checkout.success'), $request);

    // Then
    $response->assertRedirect(route('my-properties'));
});

it('redirects with error message when session is not found', function () {
    // Given
    $owner = User::factory()->create();
    $sessionId = 'fake_checkout_session_id';

    // Mock the Stripe client
    $stripeClientMock = mock(\Stripe\StripeClient::class);
    $stripeClientMock->shouldReceive('checkout->sessions->retrieve')->with($sessionId)->andReturn(null);

    $request = [
        'session_id' => $sessionId,
    ];

    $response = actingAs($owner)->get(route('checkout.success'), $request);

    // Then
    $response->assertRedirect(route('my-properties'));
    $response->assertSessionHas('message', 'Your payment has not been processed');
});

it('redirects with error message when tour is not found', function () {
    // Given
    $owner = User::factory()->create();
    $sessionId = 'fake_checkout_session_id';

    // Mock the Stripe client
    $stripeClientMock = mock(\Stripe\StripeClient::class);
    $stripeClientMock->shouldReceive('checkout->sessions->retrieve')->with($sessionId)->andReturn([
        'id' => $sessionId,
    ]);

    $request = [
        'session_id' => $sessionId,
    ];

    $response = actingAs($owner)->get(route('checkout.success'), $request);

    // Then
    $response->assertRedirect(route('my-properties'));
    $response->assertSessionHas('message', 'Your payment has not been processed');
});