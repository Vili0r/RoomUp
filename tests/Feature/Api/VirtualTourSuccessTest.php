<?php

use App\Models\Flat;
use App\Models\User;

it('stores the tour after success checkout', function () {
    // Given
    $owner = User::factory()->create();
    $sessionId = 'fake_checkout_session_id';
    actingAs($owner);
    $flat = Flat::factory()->create([
        'user_id' => $owner->id
    ]);

    $request = [
        'owner_type' => 'flat',
        'owner_id' => $flat->id,
        'contact_name' => 'Vilior',
        'email' => 'test@tes.com',
        'details' => 'Tour details',
        'contact_number' => '123456789',
        'payment_status' => 1,
        'status' => 1,
        'session_id' => $sessionId,
    ];

    $response = actingAs($owner)->post('/api/virtual-tour/success', $request);

    // Then
    $response->assertStatus(200);
});
