<?php

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

it('registers a new user with valid data', function () {
    Storage::fake('avatars');

    $birthdate = now()->subYears(20)->format('Y-m-d'); // Ensure the user is older than 18

    $data = [
        'first_name' => 'John',
        'last_name' => 'Doe',
        'email' => 'john@example.com',
        'password' => 'L3NHn8!989',
        'password_confirmation' => 'L3NHn8!989',
        'gender' => 'male',
        'birthdate' => $birthdate,
        'looking_for' => 'I have a flat or house share',
    ];

    $response = $this->postJson('/api/register', $data);

    $response->assertStatus(201);
    $this->assertDatabaseHas('users', [
        'first_name' => $data['first_name'],
        'last_name' => $data['last_name'],
        'email' => $data['email'],
        'gender' => $data['gender'],
        'birthdate' =>  $data['birthdate'],
        'looking_for' => $data['looking_for'],
    ]);
});

it('does not register a user with invalid data', function () {
    $birthdate = now()->subYears(17)->format('Y-m-d'); // User is younger than 18

    $response = $this->postJson('/api/register', [
        'first_name' => '',
        'last_name' => '',
        'email' => 'not-an-email',
        'password' => 'password',
        'password_confirmation' => 'different-password',
        'gender' => '',
        'birthdate' => $birthdate,
        'looking_for' => '',
    ]);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors([
        'first_name',
        'last_name',
        'email',
        'password',
        'gender',
        'birthdate',
        'looking_for',
    ]);
});
