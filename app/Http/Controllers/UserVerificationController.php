<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Resources\VerificationResource;
use Illuminate\Http\RedirectResponse;

class UserVerificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Verification/Index', [
            'user' => new VerificationResource($request->user()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();

        $verified = !is_null($user->verification->last_name_verified_at) && !is_null($user->verification->email_verified_at) 
                && !is_null($user->verification->phone_verified_at) && !is_null($user->verification->social_media_verified_at)
                && !is_null($user->verification->phone_verified_at) && !is_null($user->verification->selfie_verified_at)
                && !is_null($user->verification->id_document_verified_at);
          
        if ($verified) {
            $request->user()->verification()->update([
                'status' =>  3, 
            ]);
            return back()->with('status', 'account-verification-pending');
        }
        return back()->with('status', 'complete-verification-steps');
    }
}
