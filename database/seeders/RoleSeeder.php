<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;
use Illuminate\Support\Facades\Hash;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        //Create roles
        $role1 = Role::create(['name' => 'admin']);
        $role2 = Role::create(['name' => 'moderator']);
        $role3 = Role::create(['name' => 'writer']);
        Role::create(['name' => 'home owner PMS']);
        Role::create(['name' => 'user']);

        // create permissions
        Permission::create(['name' => 'create articles']);
        Permission::create(['name' => 'edit articles']);
        Permission::create(['name' => 'delete articles']);
        Permission::create(['name' => 'publish articles']);
        Permission::create(['name' => 'unpublish articles']);
        Permission::create(['name' => 'approve comments']);
        Permission::create(['name' => 'delete comments']);
        Permission::create(['name' => 'user management']);

        // assign existing permissions
        $role1->givePermissionTo('create articles');
        $role1->givePermissionTo('edit articles');
        $role1->givePermissionTo('delete articles');
        $role1->givePermissionTo('publish articles');
        $role1->givePermissionTo('unpublish articles');
        $role1->givePermissionTo('approve comments');
        $role1->givePermissionTo('delete comments');
        $role1->givePermissionTo('user management');
        
        $role2->givePermissionTo('create articles');
        $role2->givePermissionTo('edit articles');
        $role2->givePermissionTo('delete articles');
        $role2->givePermissionTo('publish articles');
        $role2->givePermissionTo('unpublish articles');
        $role2->givePermissionTo('approve comments');
        $role2->givePermissionTo('delete comments');

        $role3->givePermissionTo('create articles');
        $role3->givePermissionTo('edit articles');

        //Create users
        User::create([
            'first_name' => "moderator",
            'email' => "moderator@roomup.gr",
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'phone_number' => '12345678'
        ])->assignRole('moderator');
       
        User::create([
            'first_name' => "writer",
            'email' => "writer@roomup.gr",
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'phone_number' => '23456789'
        ])->assignRole('writer');

        User::create([
            'first_name' => "admin",
            'email' => "admin@roomup.gr",
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'phone_number' => '34567891'
        ])->assignRole('admin');
        
        User::create([
            'first_name' => "non-authenticated-user",
            'email' => "non-authenticated-user@roomup.gr",
            'email_verified_at' => now(),
            'password' => Hash::make('vQKR@!RR!c44dP'),
            'remember_token' => Str::random(10),
            'phone_number' => '456789101'
        ])->assignRole('user');

        User::create([
            'first_name' => "test-home-owner",
            'email' => "test-home-owner-pms@roomup.gr",
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
            'remember_token' => Str::random(10),
            'phone_number' => '5678910111'
        ])->assignRole('home owner PMS');
    }
}
