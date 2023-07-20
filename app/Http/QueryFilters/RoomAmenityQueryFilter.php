<?php

namespace App\Http\QueryFilters;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class RoomAmenityQueryFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        if (is_string($value)) {
            $value = explode(',', $value);
        }
        if (is_array($value)) {
            $query->whereHas('owner.amenities', function ($query) use ($value) {
                $query->whereIn('id', $value);
            });
        } else {
            $query->whereHas('owner.amenities', function ($query) use ($value) {
                $query->where('id', $value);
            });
        }
    }
}