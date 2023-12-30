<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\Rule;

class UpdatePhoneNumberController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): RedirectResponse
    {
        $request->validate([
            'phone_number' => ['min:12', 'max:15', Rule::unique('users', 'phone_number')->ignore($request->user()->id)],
        ]);

        $user = $request->user();
        $user->update([
            'phone_number' => $request->phone_number
        ]);
        $user->save();

        if ($user->isDirty('phone_number')) {
            $user->mobile_verified_at = null;
            $user->verification()->update([
                'phone_verified_at' => null,
            ]);
        }

        return Redirect::route('profile.edit');
    }
}
