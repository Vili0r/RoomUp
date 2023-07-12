<?php

namespace App\Http\Controllers;

use App\Http\Resources\AddressSearchResultResource;
use App\Models\Address;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;
use App\Models\Shared;

class HomeSearchController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $query = null;
        
        $query = QueryBuilder::for(Address::class)
            ->with(['owner' => function ($query) {
                $query->when($query->getModel() === Shared::class, function ($query) {
                    $query->with(['rooms']);
                })->when($query->getModel() === Flat::class, function ($query) {
                    $query->with(['availability']);
                });
            }])
            ->tap(function ($builder) use ($request) {
                if(filled($request->search)){
                    return $builder->whereIn('id', Address::search($request->search)->get()->pluck('id'));
                }
            })
            ->latest()
            ->get();

        $mergedData = collect();
        $secondResults = collect();

        foreach ($query as $address) {
            if ($address->owner_type === Shared::class) {
                //dd("first if");
                $rooms = $address->owner->rooms;
                if ($rooms->isNotEmpty()) {
                    //dd("second if");
                    foreach ($rooms as $room) {
                        $expandedAddress = clone $address;
                        $expandedAddress->rooms = [$room];
                        $mergedData->push($expandedAddress);
                    }
                }
            } else {
                $secondResults->push($address);
            }
        }

        $expandedResults = $mergedData
                ->concat($secondResults)
                ->sortByDesc('created_at')
                ->paginate(5);


        $properties = AddressSearchResultResource::collection($expandedResults);

        return Inertia::render('Home/HomeSearch',[
            'selectedQueries' => $request->only(['search']),
            'properties' => $properties,
            'loading' => false,
        ]);
    }
}
