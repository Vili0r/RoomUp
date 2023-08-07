<?php

namespace App\Http\QueryFilters;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;
use Carbon\Carbon;

class AvailableFromQueryFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $query->whereHas('availability', function ($query) use ($value) {
            $query->where('available_from', '>=', Carbon::parse($value));
        });
    }
}