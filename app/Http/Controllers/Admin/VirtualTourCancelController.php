<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VirtualTour;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class VirtualTourCancelController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, VirtualTour $virtualTour): RedirectResponse
    {
        $this->authorize('approve comments');
        
        $virtualTour->update([
            'status' => 4,
        ]);

        return to_route('admin.virtual-tours.index');
    }
}
