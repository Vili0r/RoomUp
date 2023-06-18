<?php

namespace App\Http\Controllers;

use App\Models\Shared;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class SharedIsFavouriteController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Shared $shared): RedirectResponse
    {
        $request->validate([
            'is_favourite' => ['required'],
        ]);

        $shared->is_favourite = $request->is_favourite;
        $shared->save();

        return back();
    }
}
