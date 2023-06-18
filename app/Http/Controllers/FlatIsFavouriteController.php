<?php

namespace App\Http\Controllers;

use App\Models\Flat;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class FlatIsFavouriteController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Flat $flat): RedirectResponse
    {
        $request->validate([
            'is_favourite' => ['required'],
        ]);

        $flat->is_favourite = $request->is_favourite;
        $flat->save();

        return back();
    }
}
