<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AdminUserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rule;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Http\Resources\PermissionResource;
use App\Http\Resources\RoleResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $this->authorize('user management');
        
        $users = AdminUserResource::collection(
            User::query()
                ->with(['permissions', 'roles', 'verification'])
                ->when($request->input('search'), function($query, $search) {
                    $query->where('first_name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                })
                ->latest()
                ->paginate(7)
        );

        return Inertia::render("Admin/User/Index", [
            'users' => $users,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $this->authorize('user management');
        
        return Inertia::render("Admin/User/Create", [
            'roles' => RoleResource::collection(Role::all()),
            'permissions' => PermissionResource::collection(Permission::all()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $this->authorize('user management');
        
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'gender' => 'required|string',
            'birthdate' => [
                'required',
                'date_format:Y-m-d',
                'before:' . Carbon::now()->subYears(18)->format('Y-m-d')
              ],
            'looking_for' => 'required',
            'roles' => 'sometimes|array',
            'permissions' => 'sometimes|array',
        ],['birthdate.before' => 'You should be more than 18 years old']);

        if($request->hasFile('avatar')){
            $avatar = $request->file('avatar')->store('avatars', 'public');
        } else {
            $avatar = 'https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp';
        }

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'gender' => $request->gender,
            'birthdate' => $request->birthdate,
            'looking_for' => $request->looking_for,
            'avatar' => $avatar,
        ]);

        if($request->has('roles')){
            $user->syncRoles($request->input('roles.*.name'));
        }

        if($request->has('permissions')){
            $user->syncPermissions($request->input('permissions.*.name'));
        }

        return to_route('admin.users.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user): Response
    {
        $this->authorize('user management');
        
        $user->load(['roles', 'permissions']);

        return Inertia::render("Admin/User/Edit", [
            'user' => new AdminUserResource($user),
            'roles' => RoleResource::collection(Role::all()),
            'permissions' => PermissionResource::collection(Permission::all()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        $this->authorize('user management');
        
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|'. Rule::unique('users', 'email')->ignore($user),
            'gender' => 'required|string',
            'birthdate' => [
                'required',
                'date_format:Y-m-d',
                'before:' . Carbon::now()->subYears(18)->format('Y-m-d')
              ],
            'looking_for' => 'required',
            'roles' => 'sometimes|array',
            'permissions' => 'sometimes|array',
        ],['birthdate.before' => 'You should be more than 18 years old']);

        if($request->hasFile('avatar')){
            $avatar = $request->file('avatar')->store('avatars', 'public');
        } else {
            $avatar = 'https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp';
        }

        $user->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'gender' => $request->gender,
            'birthdate' => $request->birthdate,
            'looking_for' => $request->looking_for,
            'avatar' => $avatar,
        ]);

        $user->syncRoles($request->input('roles.*.name'));
        $user->syncPermissions($request->input('permissions.*.name'));

        return to_route('admin.users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): RedirectResponse
    {
        $this->authorize('user management');
        
        $user->delete();

        return to_route('admin.users.index');
    }
}
