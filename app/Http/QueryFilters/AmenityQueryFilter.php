<?php

namespace App\Http\QueryFilters;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class AmenityQueryFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        if (is_array($value)) {
            $query->whereHas('amenities', function ($query) use ($value) {
                $query->whereIn('id', $value);
            });
        } else {
            $query->whereHas('amenities', function ($query) use ($value) {
                $query->where('id', $value[0]);
            });
        }
    }
}