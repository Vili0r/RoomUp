<?php

use App\Models\Roommate;
use Carbon\Carbon;
use App\Models\User;

it('updates roommate listing live_at when provided with a valid date after today', function () {
    $user = User::factory()->create();
    actingAs($user);
    $roommate = Roommate::factory()->create(['user_id' => $user->id]);
    $dateAfterToday = Carbon::now()->addDay()->format('Y-m-d');

    actingAs($user)->put(route('api.roommate.availability', $roommate), [
        'live_at' => $dateAfterToday,
    ]);
    
    expect($roommate->fresh()->live_at->format('Y-m-d'))->toBe($dateAfterToday);
});

it('fails to update roommate listing live_at when provided with a date before today', function () {
    $user = User::factory()->create();
    actingAs($user);
    $roommate = Roommate::factory()->create(['user_id' => $user->id]);

    $dateBeforeToday = Carbon::now()->subDay()->format('Y-m-d');

    $response = actingAs($user)->put(route('api.roommate.availability', $roommate), [
        'live_at' => $dateBeforeToday,
    ]);

    $response->assertSessionHasErrors(['live_at']);
});

it('does not update roommatemate listing live_at when it is not provided', function () {
    $user = User::factory()->create();
    actingAs($user);
    $roommate = Roommate::factory()->create(['user_id' => $user->id]);

    actingAs($user)->put(route('api.roommate.availability', $roommate), []);

    expect($roommate->fresh()->live_at)->toBeNull();
});

it('toggles the availability of the roommate listing', function () {
    $user = User::factory()->create();
    actingAs($user);
    $roommate = Roommate::factory()->create(['user_id' => $user->id]);

    actingAs($user)->put(route('api.roommate.availability', $roommate), [
        'available' => '0',
    ]);

    expect($roommate->fresh()->available)->toEqual(0);
});

