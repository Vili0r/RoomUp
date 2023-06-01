<?php

use App\Providers\RouteServiceProvider;
use Carbon\Carbon;

test('registration screen can be rendered', function () {
    $response = $this->get('/register');

    $response->assertStatus(200);
});

test('new users can register', function () {
    $birthdate = Carbon::now()->subYears(19)->format('Y-m-d');
    $response = $this->post('/register', [
        'first_name' => 'First name User',
        'last_name' => 'Last name User',
        'gender' => 'male',
        'birthdate' => $birthdate,
        'looking_for' => 'I have a flat or house share',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(RouteServiceProvider::HOME);
});
