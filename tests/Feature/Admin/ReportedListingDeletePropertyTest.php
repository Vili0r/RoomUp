<?php

use App\Models\Flat;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

uses(RefreshDatabase::class);

it('redirects unauthenticated users')
    ->expectGuest()->toBeRedirectedFor('/admin/reported-listings/1/delete', 'post');

// it('fails if the user is not admin 1', function () {
//     $user = User::factory()->create();
//     actingAs($user);

//     $faker = Faker::create();
//     $flat = Flat::factory()->create([
//         'user_id' => $user->id
//     ]);

//     $data = [
//         'contact_name' => $faker->firstName,
//         'email' => $faker->email,
//         'reason' => $faker->numberBetween(1, 10),
//         'details' => $faker->sentence(5),
//     ];

//     $reportedListing = $flat->reported()->create([
//         'owner_type' => 'flat',
//         'owner_id' => $flat->id,
//         'contact_name' => $data['contact_name'],
//         'email' => $data['email'],
//         'reason' => $data['reason'],
//         'status' => 1,
//         'details' => $data['details'],
//     ]);

//     actingAs($user)
//         ->post(route('admin.reported-listings.delete.property', $reportedListing))
//         ->assertStatus(403);
// });

it('renders the properties resolved page without search request', function () {
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'approve comments']);
    $role1->givePermissionTo('approve comments');
    $user = User::factory()->create()->assignRole('admin');
    $owner = User::factory()->create([
        'phone_number' => '358294982453'
    ]);
    
    actingAs($owner);
    $faker = Faker::create();
    $flat = Flat::factory()->create([
        'user_id' => $owner->id
    ]);
    $data = [
        'contact_name' => $faker->firstName,
        'email' => $faker->email,
        'reason' => $faker->numberBetween(1, 10),
        'details' => $faker->sentence(5),
    ];

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

    // Act
    $response = actingAs($user)->post(
        route('admin.reported-listings.delete.property', $reportedListing),[
            'model' => 'flat',
            'owner_id' => $flat->id,
            'title' => $flat->title,
        ]
    );
     // Mock the storage deletion and notification
     Storage::shouldReceive('delete')->once();
     Notification::fake();

    $this->assertDatabaseMissing('flats', [
        'id' => $flat->id
    ]);
    $reportedListing->refresh();
    // Assert that the reported listing status is updated to 4
    $this->assertEquals(4, $reportedListing->fresh()->status->value);

    Notification::assertSentTo(
        [$propertyUserEmail],
        ListingDeletedNotification::class,
        function ($notification, $channels) use ($propertyUserEmail, $reportedListing) {
            return $notification->email === $propertyUserEmail &&
                $notification->propertyId === $reportedListing->owner_id &&
                $notification->propertyModel === $reportedListing->model &&
                $notification->propertyTitle === $reportedListing->title;
        }
    );

    // Assert: Check that the response is a redirect to the correct route
    $response->assertRedirect(route('admin.reported-listings.index'));
});