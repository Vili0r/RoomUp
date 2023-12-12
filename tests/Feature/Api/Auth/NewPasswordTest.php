<?php

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use App\Models\User;

it('resets the user password successfully', function () {
    // Create a user
    $user = User::factory()->create();

    // Create a password reset token
    $token = Password::broker()->createToken($user);

    // New password data
    $data = [
        'token' => $token,
        'email' => $user->email,
        'password' => 'M3DRj8!989',
        'password_confirmation' => 'M3DRj8!989',
    ];

    // Make the request to the password reset route
    $response = $this->post('/api/reset-password', $data);

    // Assert the response is correct
    $response->assertStatus(200);
    $response->assertJson(['status' => trans(Password::PASSWORD_RESET)]);

    // Optionally, verify that the user's password was updated
    $user->refresh();
    expect(Hash::check('M3DRj8!989', $user->password))->toBeTrue();
});
