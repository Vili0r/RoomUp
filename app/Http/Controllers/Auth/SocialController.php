<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Social;
use App\Models\User;
use App\Notifications\SuccessfulRegistration;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialController extends Controller
{
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();    
    }
    
    public function callback($provider)
    {
        $socialUser = Socialite::driver($provider)->stateless()->user();
 
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
                'last_login_at' => now(),
            ]);
            //create socials
            $user->socials()->create([
                'provider_id' => $socialUser->getId(),
                'provider' => $provider,
                'provider_token' => $socialUser->token,
                'provider_refresh_token' => $socialUser->refreshToken,
            ]);
            $user->sendEmailVerificationNotification();
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

        //login user
        Auth::login($user);

        if(!$socials) {
            // Create the associated UserVerification record
            $userVerification = $user->verification()->create([
                'email_verified_at' => auth()->check() ? now() : null, 
            ]);
            $userVerification->save();
        }

        if (Auth::check()) {
            auth()->user()->update([
                'last_login_at' => now(),
            ]);
        }
 
        //redirect user
        return redirect('/dashboard');
    }
}
