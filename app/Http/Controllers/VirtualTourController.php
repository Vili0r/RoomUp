<?php

namespace App\Http\Controllers;

use App\Http\Requests\VirtualTourStoreRequest;
use App\Models\Flat;
use App\Models\Shared;
use App\Models\VirtualTour;
use Illuminate\Http\Request;

class VirtualTourController extends Controller
{
   public function checkout(VirtualTourStoreRequest $request)
   {
        if ($request->owner_type == 'flat') {
            $property = Flat::findOrFail($request->owner_id);
        } elseif ($request->owner_type == 'shared') {
            $property = Shared::findOrFail($request->owner_id);
        }

        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET_KEY'));

        $checkout_session = $stripe->checkout->sessions->create([
            'line_items' => [[
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => [
                        'name' => $property->title,
                        'images' => [$property->images[0]]
                    ],
                    'unit_amount_decimal' => 1990,
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => route('checkout.success', [], true). '?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('checkout.failure', [], true),
        ]);

        $property->tour()->create([
            'contact_name' => $request->contact_name,
            'email' => $request->email,
            'details' => $request->details,
            'contact_number' => $request->contact_number,
            'payment_status' => 3,
            'status' => 1,
            'payment_session_id' => $checkout_session->id,
        ]);

        return response()->json(['url' => $checkout_session->url]);
   }

    public function success(Request $request)
    {
        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET_KEY'));

        try {
            $session_id = $request->input('session_id');
            $session = $stripe->checkout->sessions->retrieve($session_id);
            
            if(!$session) {
                return to_route('my-properties')->with('message', 'Your payment has not been processed');
            }
            
            $tour = VirtualTour::query()
                ->where(['payment_session_id' => $session_id, 'payment_status' => 3])
                ->first();
            
            if(!$tour) {
                return to_route('my-properties')->with('message', 'Your payment has not been processed');
            }

            $tour->payment_status = 1;
            $tour->update();

            return to_route('my-properties')->with('message', 'Your payment has been processed successfully');
          } catch (\Exception $e) {
            return to_route('my-properties')->with('message', 'Your payment has not been processed');
        }
    }
    
    public function failure(Request $request)
    {
        return to_route('my-properties')->with('message', 'Your payment has not been processed');
    }
}
