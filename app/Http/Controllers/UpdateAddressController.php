<?php

namespace App\Http\Controllers;

use App\Models\Flat;
use App\Models\Room;
use App\Models\Shared;
use Illuminate\Http\Request;

class UpdateAddressController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, string $model, string $id)
    {
        $request->validate([
            'address_1' => ['required', 'max:30'],
            'address_2' => ['sometimes'],
            'area' => ['required', 'max:20'],
            'city' => ['required', 'max:20'],
            'post_code' => ['required', 'max:7'],
        ],[
            'post_code.required' => 'The post code field is required',
            'address_1.required' => 'The address field is required',
        ]);

        if($model === "room"){
            $shared = Shared::find($id);
            
            $shared->address()->update([
                'address_1' => $request->address_1,
                'address_2' => $request->address_2,
                'area' => $request->area,
                'city' => $request->city,
                'post_code' => $request->post_code,
                'lat' => $request->lat,
                'long' => $request->long,
                'display_name' => $request->display_name,
            ]);
        } elseif ($model === "flat") {
            $flat = Flat::find($id);
           
            $flat->address()->update([
                'address_1' => $request->address_1,
                'address_2' => $request->address_2,
                'area' => $request->area,
                'city' => $request->city,
                'post_code' => $request->post_code,
                'lat' => $request->lat,
                'long' => $request->long,
                'display_name' => $request->display_name,
            ]);
        }

        return back();
    }
}
