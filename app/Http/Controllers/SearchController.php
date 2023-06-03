<?php

namespace App\Http\Controllers;

use App\Enums\Size;
use App\Enums\Type;
use App\Http\Resources\FlatIndexResource;
use App\Http\Resources\SharedIndexResource;
use App\Http\Resources\EnumResource;
use App\Models\Flat;
use App\Models\Shared;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;
use App\Http\QueryFilters\AmenityQueryFilter;
use App\Http\Resources\AmenitiesResource;
use App\Models\Amenity;

class SearchController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        return Inertia::render('Home/Search',[
            'size' => EnumResource::collection(Size::cases()),
            'type' => EnumResource::collection(Type::cases()),
            'amenities' => AmenitiesResource::collection(Amenity::all()),
            'flats' => FlatIndexResource::collection(
                QueryBuilder::for(Flat::class)
                    ->allowedFilters($this->allowedFilters())
                    ->with(['amenities', 'address', 'transport', 'advertiser', 'flatmate', 'availability'])
                    ->latest()
                    ->paginate(15)
            ),
            'shareds' => SharedIndexResource::collection(Shared::latest()->paginate(15)),
        ]);
    }

    protected function allowedFilters()
    {
        return [
            'size',
            'type',
            AllowedFilter::custom('amenity', new AmenityQueryFilter()),
            AllowedFilter::scope('max_price'),
        ];
    }
}
