<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\VirtualTourStoreRequest;
use App\Models\Flat;
use App\Models\Shared;
use App\Models\VirtualTour;

class VirtualTourController extends Controller
{
    public function checkout(Request $request)
   {
        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET_KEY'));

        $intent = $stripe->paymentIntents->create([
            'amount' => 1900,
            'currency' => 'eur',
            'payment_method_types' => ['card'],
        ]);

        return response()->json(['clientSecret' => $intent->client_secret]);
   }

    public function success(VirtualTourStoreRequest $request)
    {
        if ($request->owner_type == 'flat') {
            $property = Flat::findOrFail($request->owner_id);
        } elseif ($request->owner_type == 'shared') {
            $property = Shared::findOrFail($request->owner_id);
        }
                
        $property->tour()->create([
            'contact_name' => $request->contact_name,
            'email' => $request->email,
            'details' => $request->details,
            'contact_number' => $request->contact_number,
            'payment_status' => 1,
            'status' => 1,
            'payment_session_id' => $request->payment_session_id
        ]);

        return response()->json(['Virtual Tour Booked Successsfully'], 200);
    }
}
