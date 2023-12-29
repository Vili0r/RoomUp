<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SendMobileVerificationCodeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        if(!$request->user()->hasVerifiedMobile()){
            $request->user()->sendMobileVerificationNotification(true);
        }
    }
}
