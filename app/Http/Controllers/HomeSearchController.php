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
use App\Models\Shared;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Pagination\Paginator;

use function GuzzleHttp\Promise\queue;

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
                    $query->with('rooms');
                })->when($query->getModel() === Flat::class, function ($query) {
                    $query->with('availability');
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

        $expandedResults = $mergedData->concat($secondResults);

        $paginatedResults = $this->paginate($expandedResults, 10, $page = null, $options = []);

        $properties = AddressSearchResultResource::collection($paginatedResults);

        return Inertia::render('Home/HomeSearch',[
            'selectedQueries' => $request->only(['search']),
            'properties' => $properties,
            'loading' => false,
        ]);
    }

    private function paginate(Collection $collection, $perPage, $page = null, $options = [])
    {
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
        $paginator = new LengthAwarePaginator(
            $collection->forPage($page, $perPage),
            $collection->count(),
            $perPage,
            $page,
            $options
        );
        return $paginator->withPath('');
    }
}
