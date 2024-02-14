<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\UserVerification;
use Illuminate\Support\Facades\Storage;

uses( RefreshDatabase::class);

it('does not allow unauthenticated user to verify id document', function() {
    $response = $this->post(route('profile-id_document-verification.update'));

    $response->assertStatus(302);
});

it('uploads id_document and updates verification', function () {
    // Given
    Storage::fake('public');
    $user = User::factory()
        ->has(UserVerification::factory(), 'verification')
        ->create();

    actingAs($user)
        ->post(route('profile-id_document-verification.update'), [
            'id_document' => 'id.jpg',
        ]);

    // Then
    $user->refresh(); 
    $this->assertNotNull($user->verification->id_document_verified_at);
});

it('does not upload id_document if no id_document is provided', function () {
    // Given
    Storage::fake('public');
    $user = User::factory()
        ->has(UserVerification::factory(), 'verification')
        ->create();

    $this->actingAs($user);
    $response = actingAs($user)->post(route('profile-id_document-verification.update'), []);

    // Then
    $response->assertStatus(200); // Assuming it returns a blank response
    $user->refresh();
    $this->assertNull($user->verification->id_document_verified_at);
    Storage::disk('public')->assertMissing($user->verification->id_document);
});
