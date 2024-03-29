<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomerContactIndexResource;
use App\Models\CustomerContact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerContactIndexController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $customerContacts = CustomerContactIndexResource::collection(
            CustomerContact::query()
                ->when($request->input('search'), function($query, $search) {
                    $query->where('first_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('reason', 'like', "%{$search}%");
                })
                ->when($request->input('status'), function($query, $status) {
                    $query->where('status', $status);
                })
                ->latest()
                ->paginate(7)
            );

        return Inertia::render('Admin/Contact/Index', [
            'customerContacts' => $customerContacts,
            'filters' => $request->only(['search', 'status'])
        ]);
    }
}
