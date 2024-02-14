<?php

use App\Models\User;
use App\Models\UserVerification;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('does not allow unauthenticated user to verify phone number', function() {
    $response = $this->post(route('profile-phone-number.update'));

    $response->assertStatus(302);
});

it('updates phone number and redirects to profile edit page', function () {
    // Given
    $user = User::factory()
        ->has(UserVerification::factory(), 'verification')    
        ->create();

    $newPhoneNumber = '2345678901234';
    $response = actingAs($user)
         ->patch(route('profile-phone-number.update'), ['phone_number' => $newPhoneNumber]);

    // Then
    $this->assertEquals($newPhoneNumber, $user->refresh()->phone_number);
    $this->assertNull($user->mobile_verified_at);
    $user->load('verification');
    $this->assertNull($user->verification->phone_verified_at);
    $response->assertRedirect(route('profile.edit'));
});

it('does not update phone number if validation fails', function () {
    // Given
    $user = User::factory()->create();
  
    $existingPhoneNumber = $user->phone_number;
    $response = actingAs($user)
         ->patch(route('profile-phone-number.update'), ['phone_number' => '1234']);

    // Then
    $this->assertEquals($existingPhoneNumber, $user->refresh()->phone_number);
    $response->assertSessionHasErrors('phone_number');
});

it('ignores unique phone number validation for the current user', function () {
    // Given
    $user = User::factory()->create();
    
    $response = actingAs($user)
    ->patch(route('profile-phone-number.update'), ['phone_number' => $user->phone_number]);

    // Then
    $response->assertRedirect(route('profile.edit'));
});

// use App\Models\User;
// use Illuminate\Foundation\Testing\RefreshDatabase;

// uses(RefreshDatabase::class);

// it('validates the phone number correctly', function () {
//     $user = User::factory()->create([
//         'phone_number' => '123456789012',
//         'mobile_verified_at' => now(),
//     ]);

//     actingAs($user)
//         ->patch(route('profile-phone-number.update'), ['phone_number' => '123']) // Too short
//         ->assertStatus(302)
//         ->assertSessionHasErrors('phone_number');

//     actingAs($user)
//         ->patch(route('profile-phone-number.update'), ['phone_number' => '1234567890123456']) // Too long
//         ->assertStatus(302)
//         ->assertSessionHasErrors('phone_number');

//     // Ensure the $anotherUser has a different phone number
//     $anotherUser = User::factory()->create(['phone_number' => '098765432109']);
//     actingAs($anotherUser)
//         ->patch(route('profile-phone-number.update'), ['phone_number' => $user->phone_number]) // Not unique
//         ->assertStatus(302)
//         ->assertSessionHasErrors('phone_number');
// });

// it('updates the phone number and nullifies verification timestamps', function () {
//     $user = User::factory()->create([
//         'phone_number' => '123456789012',
//         'mobile_verified_at' => now(),
//     ]);
//     $user->verification()->create(['phone_verified_at' => now()]);

//     actingAs($user)
//         ->patch(route('profile-phone-number.update'), ['phone_number' => '987654321098'])
//         ->assertRedirect(route('profile.edit'));

//     $user->refresh();
//     expect($user->phone_number)->toBe('987654321098');
//     $user->refresh();
//     expect($user->mobile_verified_at)->toBeNull();
//     expect($user->verification->phone_verified_at)->toBeNull();
// });
