<?php

use App\Models\Flat;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Notifications\ListingErrorNotification;
use Illuminate\Support\Facades\Notification;
use Illuminate\Notifications\AnonymousNotifiable;

uses(RefreshDatabase::class);

it('fails if the user is not admin', function () {
    $user = User::factory()->create();
    actingAs($user);

    $faker = Faker::create();
    $flat = Flat::factory()->create([
        'user_id' => $user->id
    ]);

    $data = [
        'contact_name' => $faker->firstName,
        'email' => $faker->email,
        'reason' => $faker->numberBetween(1, 10),
        'details' => $faker->sentence(5),
    ];

    $reportedListing = $flat->reported()->create([
        'owner_type' => 'flat',
        'owner_id' => $flat->id,
        'contact_name' => $data['contact_name'],
        'email' => $data['email'],
        'reason' => $data['reason'],
        'status' => 1,
        'details' => $data['details'],
    ]);

    actingAs($user)
        ->post(route('admin.reported-listings.email-listing-owner', $reportedListing))
        ->assertStatus(403);
});

it('renders the properties resolved page without search request', function () {
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'approve comments']);
    $role1->givePermissionTo('approve comments');
    $user = User::factory()->create()->assignRole('admin');
    
    actingAs($user);
    $faker = Faker::create();
    Notification::fake();

    $data = [
        'contact_name' => $faker->firstName,
        'email' => $faker->email,
        'reason' => $faker->numberBetween(1, 10),
        'details' => $faker->sentence(5),
    ];

    actingAs($user);

    $flat = Flat::factory()->create([
        'user_id' => $user->id
    ]);
    $propertyUserEmail = $flat->user->email; 

    $reportedListing = $flat->reported()->create([
        'owner_type' => 'flat',
        'owner_id' => $flat->id,
        'contact_name' => $data['contact_name'],
        'email' => $data['email'],
        'reason' => $data['reason'],
        'status' => 1,
        'details' => $data['details'],
    ]);

    $requestData = [
        'model' => 'flat',
        'owner_id' => $flat->id,
        'title' => 'Test Title',
        'details' => 'Test Details',
        'reason' => 'Test Reason',
    ];

    // Act
    $response = $this->post(route('admin.reported-listings.email-listing-owner', $reportedListing), $requestData);

    Notification::assertSentTo(
        new AnonymousNotifiable,
        ListingErrorNotification::class,
        function ($notification, $channels, $notifiable) use ($propertyUserEmail) {
            return $notifiable->routes['mail'] === $propertyUserEmail;
        }
    );

    $reportedListing->refresh();
    expect($reportedListing->status->value)->toEqual(2); 

    // Assert: Check that the response is a redirect to the correct route
    $response->assertRedirect(route('admin.reported-listings.index'));
});