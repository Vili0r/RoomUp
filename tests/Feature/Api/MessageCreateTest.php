<?php

use App\Models\Flat;
use App\Models\User;
use Illuminate\Testing\Fluent\AssertableJson;

it('does not allow unauthenticated user to create a message for listing', function() {
    $response = $this->get('/api/message/create');

    $response->assertStatus(302);
});

it('returns property message resource for flat', function () {
    // Create a user and authenticate them
    $owner = User::factory()->create();
    $user1 = User::factory()->create();

    actingAs($owner);
    $flat = Flat::factory()->create([
        'user_id' => $owner->id
    ]);
 
    // Make a request to the index method
    $response = actingAs($user1)
        ->get('/api/message/create', [
            'type' => 'flat',
            'id' => $flat->id,
        ]);

    $response->assertOk();
});
