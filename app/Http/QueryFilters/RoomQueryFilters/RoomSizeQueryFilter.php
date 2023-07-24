<?php

namespace App\Http\QueryFilters\RoomQueryFilters;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class RoomSizeQueryFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $query->whereHas('owner', function ($query) use ($value) {
            $query->where('size', $value);
        });
    }
}