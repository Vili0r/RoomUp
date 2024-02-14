<?php

use App\Models\User;
use App\Models\UserVerification;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

it('does not allow unauthenticated user to verify photot profile', function() {
    $response = $this->post(route('profile-photo.update'));

    $response->assertStatus(302);
});

it('uploads an avatar and updates user profile', function () {
    Storage::fake('public');
    $user = User::factory()
        ->has(UserVerification::factory(), 'verification')
        ->create();

    $file = UploadedFile::fake()->image('avatar.jpg');

    actingAs($user)
        ->post(route('profile-photo.update'), [
            'avatar' => $file,
        ])
        ->assertRedirect()
        ->assertSessionHas('status', 'profile-photo-uploaded');

    $user->refresh();
    
    expect($user->avatar)->not->toBeNull();
    expect($user->verification->photo_verified_at)->not->toBeNull();
    expect($user->verification->selfie_verified_at)->toBeNull();
});

it('fails to update avatar and redirects back with status', function () {
    $user = User::factory()->create();

    actingAs($user)
        ->post(route('profile-photo.update'))
        ->assertSessionHasErrors('avatar')
        ->assertRedirect();
});
