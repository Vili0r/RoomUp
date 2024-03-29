<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomerContactShowResource;
use App\Models\CustomerContact;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class CustomerContactShowController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, CustomerContact $customerContact): Response
    {
        $this->authorize('approve comments');

        return Inertia::render('Admin/Contact/Show', [
            'customerContact' => new CustomerContactShowResource($customerContact),
        ]);
    }
}
