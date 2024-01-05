<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Resources\AdminVerificationResource;
use App\Models\User;

class UserVerifyController extends Controller
{
    public function index (Request $request): Response
    {
        $this->authorize('user management');
        
        $users = AdminVerificationResource::collection(
            User::query()
                ->with(['verification' => function($query) {
                    $query->where('status', 3);
                }])
                ->whereHas('verification', function($query) {
                    $query->where('status', 3);
                })
                ->when($request->input('search'), function($query, $search) {
                    $query->where('first_name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                })
                ->latest()
                ->paginate(7)
        );

        return Inertia::render("Admin/Verify/Index", [
            'users' => $users,
            'filters' => $request->only(['search'])
        ]);
    }

    public function edit(User $user): Response
    {
        $this->authorize('user management');
        
        $user->load(['verification']);

        return Inertia::render("Admin/Verify/Edit", [
            'user' => new AdminVerificationResource($user),
        ]);
    }
}
