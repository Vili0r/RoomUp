<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class MobileVerificationPromptController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): RedirectResponse|Response
    {
        return $request->user()->hasVerifiedMobile()
                    ? redirect()->intended(RouteServiceProvider::HOME)
                    :   Inertia::render('Auth/VerifyMobile', [
                            'phone_number' => auth()->user()->phone_number
                        ]);
    }
}
