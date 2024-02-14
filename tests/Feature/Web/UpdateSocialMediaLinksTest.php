<?php

use App\Models\User;
use App\Models\UserVerification;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('does not allow unauthenticated user to verify social media', function() {
    $response = $this->post(route('profile-social-links.update'));

    $response->assertStatus(302);
});

it('updates social media links and redirects to profile edit page', function () {
    // Given
    $user = User::factory()
        ->has(UserVerification::factory(), 'verification')
        ->create();

    $response = actingAs($user)->patch(route('profile-social-links.update'), [
        'facebook_link' => 'https://www.facebook.com/example',
        'instagram_link' => 'https://www.instagram.com/example',
        'tiktok_link' => 'https://www.tiktok.com/@example',
        'linkedin_link' => 'https://www.linkedin.com/in/example',
    ]);

    // Then
    $user->refresh();
    $this->assertEquals('https://www.facebook.com/example', $user->facebook_link);
    $this->assertEquals('https://www.instagram.com/example', $user->instagram_link);
    $this->assertEquals('https://www.tiktok.com/@example', $user->tiktok_link);
    $this->assertEquals('https://www.linkedin.com/in/example', $user->linkedin_link);
    $this->assertNotNull($user->verification->social_media_verified_at);
    $response->assertRedirect(route('profile.edit'));
});

it('does not update social media links if validation fails', function () {
    // Given
    $user = User::factory()->create();

    $existingFacebookLink = $user->facebook_link;
    $response = actingAs($user)->patch(route('profile-social-links.update'), [
        'facebook_link' => 'https://www.faceook.com/example',
        'instagram_link' => 'https://www.insagram.com/example',
        'tiktok_link' => 'https://www.tktok.com/@example',
        'linkedin_link' => 'https://www.lnkedin.com/example',
    ]);

    // Then
    $user->refresh();
    $this->assertEquals($existingFacebookLink, $user->facebook_link);
    $response->assertSessionHasErrors(['facebook_link', 'instagram_link', 'tiktok_link', 'linkedin_link']);
});

it('does not set social_media_verified_at if no social media links are present', function () {
    // Given
    $user = User::factory()
        ->has(UserVerification::factory(), 'verification')
        ->create([
            'facebook_link' => null, 
            'instagram_link' => null, 
            'tiktok_link' => null, 
            'linkedin_link' => null
        ]);
    
    $response = actingAs($user)->patch(route('profile-social-links.update'), [
        'facebook_link' => null,
        'instagram_link' => null,
        'tiktok_link' => null,
        'linkedin_link' => null,
    ]);

    // Then
    $user->refresh();
    $this->assertNull($user->verification->social_media_verified_at);
    $response->assertRedirect(route('profile.edit'));
});
