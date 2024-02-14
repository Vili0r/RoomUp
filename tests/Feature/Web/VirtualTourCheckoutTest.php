<?php

use App\Models\Flat;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('does not allow unauthenticated user to checkout', function() {
    $response = $this->post(route('virtual-tour.checkout'));

    $response->assertStatus(302);
});

it('creates a new tour and returns JSON response with checkout Stripe URL', function () {
    $owner = User::factory()->create();
    actingAs($owner);
    $flat = Flat::factory()->create([
        'user_id' => $owner->id
    ]);

    $response = actingAs($owner)->post(route('virtual-tour.checkout'), [
        'owner_type' => 'flat', // Assuming 'flat' owner type for this test
        'owner_id' => $flat->id,
        'contact_name' => 'John Doe',
        'email' => 'john@example.com',
        'details' => 'Tour details',
        'contact_number' => '123456789',
    ]);

    // Mock the Stripe client
    $stripeClientMock = $this->mock(\Stripe\StripeClient::class);
    $stripeClientMock->shouldReceive('checkout->sessions->create')->andReturn([
        'id' => 'fake_checkout_session_id',
        'url' => 'https://checkout.stripe.com/c/pay/cs_test_a1',
    ]);

    // Then
    $this->assertStringStartsWith('https://checkout.stripe.com/c/pay/cs_test', $response->json('url'));
});
