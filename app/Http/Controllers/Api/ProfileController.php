<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class ProfileController extends Controller
{
     /**
     * Display the user's profile form.
     */
    public function edit(User $user)
    {
        return response()->json([
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
            'user' => $user->only('id', 'first_name', 'last_name', 'email', 'email_verified_at'),
        ]);
    }
    /**
     * Update the user's profile information.
     */
    public function update(User $user, ProfileUpdateRequest $request)
    {
        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return response()->json([
            'user' => $user->only('id', 'first_name', 'email', 'avatar'),
        ], 201);
    }

    /**
     * Delete the user's account.
     */
    public function destroy(User $user, Request $request)
    {
        $request->validate([
            'password' => ['required', 'current-password'],
        ]);

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
