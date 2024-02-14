<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;

uses(RefreshDatabase::class);

it('does not allow unauthenticated user to verify account', function() {
    $response = $this->get(route('verification.index'));

    $response->assertStatus(302);
});

it('renders Verification/Index page with user prop', function () {
    // Create a user for testing
    $user = User::factory()->create();

    // Make a GET request to the index route
    $response = actingAs($user)->get(route('verification.index'));

    // Assert that the response is successful
    $response->assertStatus(200);

    // Assert that the Inertia page is rendered
    $response->assertInertia(
        fn (AssertableInertia $page) => $page
            ->component('Verification/Index')
            ->has('user')
    );
});