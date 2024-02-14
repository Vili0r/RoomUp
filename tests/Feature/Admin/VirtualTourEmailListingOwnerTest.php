<?php

use App\Models\Flat;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Notifications\VirtualTourBookingNotification;
use Illuminate\Support\Facades\Notification;
use Illuminate\Notifications\AnonymousNotifiable;

uses(RefreshDatabase::class);

it('renders the properties resolved page without search request', function () {
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'approve comments']);
    $role1->givePermissionTo('approve comments');
    $user = User::factory()->create()->assignRole('admin');
    
    actingAs($user);
    Notification::fake();
    actingAs($user);
    $flat = Flat::factory()->create([
        'user_id' => $user->id
    ]);
    $propertyUserEmail= $flat->user->email;

    $sessionId = 'fake_checkout_session_id';
    $virtualTour = $flat->tour()->create([
        'owner_type' => 'flat', // Assuming 'flat' owner type for this test
        'owner_id' => $flat->id,
        'contact_name' => 'John Doe',
        'email' => 'john@example.com',
        'details' => 'Tour details',
        'contact_number' => '123456789',
        'payment_status' => 3,
        'status' => 1,
        'payment_session_id' => $sessionId,
    ]);
    
    $requestData = [
        'model' => 'flat',
        'owner_id' => $flat->id,
        'title' => 'Test Title',
        'details' => 'Test Details',
        'reason' => 'Test Reason',
    ];

    // Act
    $response = $this->post(route('admin.virtual-tours.email-listing-owner', $virtualTour), $requestData);

    Notification::assertSentTo(
        new AnonymousNotifiable,
        VirtualTourBookingNotification::class,
        function ($notification, $channels, $notifiable) use ($propertyUserEmail) {
            return $notifiable->routes['mail'] === $propertyUserEmail;
        }
    );

    $virtualTour->refresh();
    expect($virtualTour->status->value)->toEqual(2); 

    // Assert: Check that the response is a redirect to the correct route
    $response->assertRedirect(route('admin.reported-listings.index'));
});