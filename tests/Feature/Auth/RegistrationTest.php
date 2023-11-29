<?php

use App\Providers\RouteServiceProvider;
use Carbon\Carbon;

test('registration screen can be rendered', function () {
    $response = $this->get('/register');

    $response->assertStatus(200);
});

test('new users can register', function () {
    $birthdate = Carbon::now()->subYears(19)->format('Y-m-d');
    $timestamp = time();
    $response = $this->post('/register', [
        'first_name' => 'First name User',
        'last_name' => 'Last name User',
        'gender' => 'male',
        'birthdate' => $birthdate,
        'looking_for' => 'I have a flat or house share',
        'email' => 'test'.$timestamp.'@example.com',
        'password' => 'L3NHn8!989',
        'password_confirmation' => 'L3NHn8!989',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(RouteServiceProvider::HOME);
});
