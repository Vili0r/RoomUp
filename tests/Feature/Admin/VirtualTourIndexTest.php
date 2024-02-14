<?php

use App\Models\Flat;
use App\Models\User;
use Faker\Factory as Faker;
use Inertia\Testing\AssertableInertia;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

uses(RefreshDatabase::class);

it('does not allow unauthenticated user to get virtual tours index', function() {
    $response = $this->get(route('admin.virtual-tours.index'));

    $response->assertStatus(302);
});

it('fails if the user is not admin', function () {
    $user = User::factory()->create();

    actingAs($user)
        ->get(route('admin.virtual-tours.index'))
        ->assertStatus(403);
});

it('renders the virtual tours index page without search request', function () {
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'delete comments']);
    $role1->givePermissionTo('delete comments');
    $user = User::factory()->create()->assignRole('admin');
    
    actingAs($user);

    $flat = Flat::factory()->create([
        'user_id' => $user->id
    ]);

    $sessionId = 'fake_checkout_session_id';
    $flat->tour()->create([
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
    $response = $this->get(route('admin.virtual-tours.index'));

    // Assert
    $response->assertInertia(
        fn (AssertableInertia $page) => $page
            ->component('Admin/Tour/Index')
            ->has('virtualTours.data', 1) 
    );
});

it('renders the virtual tours index page with search request', function () {
    $role1 = Role::create(['name' => 'admin']);
    Permission::create(['name' => 'delete comments']);
    $role1->givePermissionTo('delete comments');
    $user = User::factory()->create()->assignRole('admin');
    
    actingAs($user);
    $flat = Flat::factory()->create([
        'user_id' => $user->id
    ]);

    $sessionId = 'fake_checkout_session_id';
    $flat->tour()->create([
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
    $response = $this->get(route('admin.virtual-tours.index', [
        'search' => 'Two bedroom'
    ]));

    $response->assertInertia(fn (AssertableInertia $page) => $page
        ->component('Admin/Tour/Index')
        ->has('virtualTours.data', 0) // Assuming there are 6 items in total
        ->has('filters', fn (AssertableInertia $page) => $page
            ->where('search', 'Two bedroom') // Assert that the search term is present in the filters
            ->etc()
        )
    );
});
