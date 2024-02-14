<?php

use App\Models\User;
use App\Models\UserVerification;
use App\Notifications\RejectedVerificationNotification;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Notification;
use Illuminate\Notifications\AnonymousNotifiable;

it('redirects unauthenticated users')
    ->expectGuest()->toBeRedirectedFor('/admin/user/1/verification/reject', 'post');

it('fails if the user is normal user', function () {
    $user = User::factory()->create();
    actingAs($user)
        ->post('/admin/user/1/verification/reject')
        ->assertStatus(403);
});

it('fails if the user is not admin', function () {
    Role::create(['name' => 'moderator']);
    $moderator = User::factory()->create()->assignRole('moderator');

    actingAs($moderator)
        ->post('/admin/user/'.$moderator->id.'/verification/reject')
        ->assertStatus(403);
});

it('fails if the user has not the right permission', function () {
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'user']);
    $role1->givePermissionTo('user');
    $user = User::factory()->create()->assignRole('admin');

    actingAs($user)
        ->post('/admin/user/'.$user->id.'/verification/reject')
        ->assertStatus(403);
});

it('renders the user verification edti page with search request', function () {
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'user management']);
    $role1->givePermissionTo('user management');
    $user = User::factory()->create()->assignRole('admin');
    $userToVerify = User::factory()
        ->has(UserVerification::factory(), 'verification') 
        ->create([
            'phone_number' => '23435325115697'
        ]);

    Notification::fake();
    actingAs($user);

    $requestData = [
        'text' => 'last name socials id selfie'
    ];

    // Act
    $response = $this->post(route('admin.user.reject.verification', $userToVerify), $requestData);
    
    $userToVerify->refresh();
    $userToVerify->load('verification');
    expect($userToVerify->verification->last_name_verified_at)->toBeNull();
    expect($userToVerify->verification->socials_verified_at)->toBeNull();
    expect($userToVerify->verification->id_verified_at)->toBeNull();
    expect($userToVerify->verification->selfie_verified_at)->toBeNull();
    expect($userToVerify->verification->status->value)->toEqual(3);

    Notification::assertSentTo(
        new AnonymousNotifiable,
        RejectedVerificationNotification::class,
        function ($notification, $channels, $notifiable) use ($userToVerify) {
            return $notifiable->routes['mail'] === $userToVerify->email;
        }
    );

    // Assert: Check that the response is a redirect to the correct route
    $response->assertRedirect(route('admin.user.verification.index'));
});