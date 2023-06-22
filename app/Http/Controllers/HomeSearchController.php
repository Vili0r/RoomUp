<?php

namespace App\Http\Controllers;

use App\Http\Resources\AddressSearchResultResource;
use App\Models\Address;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;
use App\Http\Resources\FlatSearchResultResource;
use App\Http\Resources\SharedSearchResultResource;

class HomeSearchController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $query = null;

        $query = QueryBuilder::for(Address::class)
                ->with(['owner'])
                ->tap(function ($builder) use ($request) {
                    if(filled($request->search)){
                        return $builder->whereIn('id', Address::search($request->search)->get()->pluck('id'));
                    }
                })
                ->latest()
                ->paginate(15)
                ->appends($request->query());

        return Inertia::render('Home/HomeSearch',[
            'properties' => AddressSearchResultResource::collection($query),
            'loading' => false,
        ]);
    }
}
