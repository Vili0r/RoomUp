<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerContactStoreRequest;
use App\Models\CustomerContact;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CustomerContactController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response 
    {
        return Inertia::render('Contact/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CustomerContactStoreRequest $request): RedirectResponse
    {
        CustomerContact::create($request->validated() + [
            'status' => 1,
        ]);
        
        return to_route('dashboard');
    }
}
