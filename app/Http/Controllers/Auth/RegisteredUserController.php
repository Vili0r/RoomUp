<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
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
            $isPhotoVerified = now();
        } else {
            $avatar = 'https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp';
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
            'avatar' => $avatar,
            'last_login_at' => now(),
        ]);

        $user->sendEmailVerificationNotification();

        event(new Registered($user));

        Auth::login($user);

        // Create the associated UserVerification record
        $userVerification = $user->verification()->create([
            'last_name_verified_at' => now(), 
            'email_verified_at' => auth()->check() ? now() : null, 
            'photo_verified_at' => $isPhotoVerified, 
        ]);
        $userVerification->save();

        return redirect(RouteServiceProvider::HOME);
    }
}
