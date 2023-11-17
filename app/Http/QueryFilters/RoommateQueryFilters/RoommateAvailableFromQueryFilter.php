<?php

namespace App\Http\QueryFilters\RoommateQueryFilters;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;
use Carbon\Carbon;

class RoommateAvailableFromQueryFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $query->whereHas('availability', function ($query) use ($value) {
            $query->where('available_from', '>=', Carbon::parse($value));
        });
    }
}