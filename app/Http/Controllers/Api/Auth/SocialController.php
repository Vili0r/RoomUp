<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use App\Models\Social;

class SocialController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, string $provider)
    {
        $socialUser = Socialite::driver($provider)->stateless()->userFromToken($request->token);
 
        //check if user exists
        $user = User::where('email', $socialUser->getEmail())->first();
        
        //if user does not exist
        if(!$user) {
            //create new user
            $user = User::create([
                'first_name' => $socialUser->getName(),
                'email' => $socialUser->getEmail(),
                'password' => Hash::make(Str::random(7)),
                'avatar' => $socialUser->getAvatar(),
            ]);
            //create socials
            $user->socials()->create([
                'provider_id' => $socialUser->getId(),
                'provider' => $provider,
                'provider_token' => $socialUser->token,
                'provider_refresh_token' => $socialUser->refreshToken,
            ]);
        }

        //if user exist
        $socials = Social::where('provider', $provider)->where('user_id', $user->id)->first();

        //check if user does not have socials
        if(!$socials){
            //create socials
            $user->socials()->create([
                'provider_id' => $socialUser->getId(),
                'provider' => $provider,
                'provider_token' => $socialUser->token,
                'provider_refresh_token' => $socialUser->refreshToken,
            ]);
        }

        $token = $user->createToken($request->device_name)->plainTextToken;
    
        return response()->json([
            'token' => $token,
            'user' => $user->only('id', 'first_name', 'email', 'avatar'),
        ], 201);
    }
}
