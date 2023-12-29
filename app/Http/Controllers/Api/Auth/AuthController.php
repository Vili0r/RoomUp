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
            $file = $request->file('avatar');
            $filename = uniqid() . "_" . $file->getClientOriginalName();
            $file->move(public_path('uploads/avatars'), $filename);
            $url = 'uploads/avatars/' . $filename;
            $isPhotoVerified = now();
        } else {
            $url = 'https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp';
            $isPhotoVerified = null;
        }

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'gender' => $request->gender,
            'birthdate' => $request->birthdate,
            'looking_for' => $request->looking_for,
            'avatar' => $url,
        ]);

        $user->sendEmailVerificationNotification();

        // Create the associated UserVerification record
        $userVerification = $user->verification()->create([
            'last_name_verified_at' => now(), 
            'email_verified_at' => $user->hasVerifiedEmail() ? now() : null, 
            'photo_verified_at' => $isPhotoVerified, 
        ]);
        $userVerification->save();
    
        return response()->json($user, 201);
    }

    public function logout (Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        
        return response()->json('Logged out', 200);   
    }
}
