<?php

use App\Models\Flat;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

uses(RefreshDatabase::class);

it('renders the virtual tours resolved page', function () {
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'approve comments']);
    $role1->givePermissionTo('approve comments');
    $user = User::factory()->create()->assignRole('admin');
    
    actingAs($user);
    $flat = Flat::factory()->create([
        'user_id' => $user->id
    ]);

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

    // Act
    $response = $this->put(route('admin.virtual-tours.completed', $virtualTour));

    $virtualTour->refresh();
    expect($virtualTour->completed_at)->not->toBeNull();
    expect($virtualTour->status->value)->toEqual(3);

    // Assert: Check that the response is a redirect to the correct route
    $response->assertRedirect(route('admin.virtual-tours.index'));
});