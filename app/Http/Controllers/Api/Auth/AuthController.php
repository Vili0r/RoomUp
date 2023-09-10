<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Carbon\Carbon;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'required',
        ]);
     
        $user = User::where('email', $request->email)->first();
     
        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }
     
        $token = $user->createToken($request->device_name)->plainTextToken;
    
        return response()->json([
            'token' => $token,
            'user' => $user->only('id', 'first_name', 'email', 'avatar'),
        ], 201);
    }

    public function register(Request $request)
    {
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

        return response()->json($user, 201);
    }

    public function logout (Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        
        return response()->json('Logged out', 200);   
    }
}
