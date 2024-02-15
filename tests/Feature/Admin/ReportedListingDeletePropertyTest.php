<?php

use App\Http\Controllers\Admin\ReportedListingDeletePropertyController;
use App\Models\Flat;
use Faker\Factory as Faker;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

uses(RefreshDatabase::class);

beforeEach(function () {
    // Mock the authorization to always return true
    $this->withoutMiddleware();

    // Mock the Notification facade
    Notification::fake();

    // Mock the Storage facade
    Storage::fake('local');
});

it('deletes a flat and sends a notification', function () {
    // Arrange
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'user management']);
    $user = User::factory()->create()->assignRole('admin');
    $role1->givePermissionTo('user management');
    actingAs($user);
    $flat = Flat::factory()->create(['user_id' => $user->id]);
    $user = $flat->user;
    $faker = Faker::create();
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

    $request = new Request([
        'model' => 'flat',
        'owner_id' => $flat->id,
        'title' => $flat->title,
    ]);

    // Act
    $controller = new ReportedListingDeletePropertyController();
    $response = $controller($request, $reportedListing);

    // Assert
    // expect($flat->fresh())->toBeNull();
    Storage::assertMissing($flat->images);
    
    expect($reportedListing->fresh()->status->value)->toEqual(4);
});
