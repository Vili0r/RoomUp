<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Models\CustomerContact;

class CustomerContactResolveController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, CustomerContact $customerContact): RedirectResponse
    {
        $this->authorize('approve comments');
        
        $customerContact->update([
            'resolved_at' => now(),
            'status' => 2,
        ]);

        return to_route('admin.customer-contacts.index');   
    }
}
