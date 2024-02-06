<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\VirtualTourShowResource;
use App\Models\VirtualTour;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class VirtualTourShowController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, VirtualTour $virtualTour): Response
    {
        $this->authorize('approve comments');

        $virtualTour->load('owner');

        return Inertia::render('Admin/Tour/Show', [
            'virtualTour' => new VirtualTourShowResource($virtualTour),
        ]);
    }
}
