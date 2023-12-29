<?php

namespace App\Http\Controllers\Auth;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;

class VerifyMobileController extends Controller
{
    public function __invoke(Request $request)
    {
        //Redirect user to dashboard if mobile already verified
        if ($request->user()->hasVerifiedMobile()) return redirect()->to(RouteServiceProvider::HOME);

        $request->validate([
            'code' => ['required', 'numeric'],
        ]);
        
        // Code correct
        if ($request->code === auth()->user()->mobile_verify_code) {    
            $secondsOfValidation = (int) config('mobile.seconds_of_validation');
            if ($secondsOfValidation > 0 &&  $request->user()->mobile_verify_code_sent_at->diffInSeconds() > $secondsOfValidation) { 
                $request->user()->sendMobileVerificationNotification(true);  
                return to_route('verification-mobile.notice')->with('status', 'mobile-expired');
            }else {
                $request->user()->markMobileAsVerified();
                $request->user()->verification()->update([
                    'phone_verified_at' => $request->user()->markMobileAsVerified() ? now() : null, 
                ]);
                return to_route('profile.edit');
            }
        }

        // Max attempts feature
        if (config('mobile.max_attempts') > 0) {
            if ($request->user()->mobile_attempts_left <= 1) {
                if($request->user()->mobile_attempts_left == 1) $request->user()->decrement('mobile_attempts_left');

                //check how many seconds left to get unbanned after no more attempts left
                $seconds_left = (int) config('mobile.attempts_ban_seconds') - $request->user()->mobile_last_attempt_date->diffInSeconds();
                if ($seconds_left > 0) {
                    return to_route('verification-mobile.notice')->with('status', 'mobile.error_wait');
                }

                //Send new code and set new attempts when user is no longer banned
                $request->user()->sendMobileVerificationNotification(true);
                return to_route('verification-mobile.notice')->with('status', 'mobile.new_code');
            }

            $request->user()->decrement('mobile_attempts_left');
            $request->user()->update(['mobile_last_attempt_date' => now()]);
            return to_route('verification-mobile.notice')->with('status', 'mobile.error_with_attempts');
        }

        return to_route('verification-mobile.notice')->with('status', 'invalid-code');
    }
}
