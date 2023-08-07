<?php

namespace App\Http\QueryFilters;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class ShortTermQueryFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $query->whereHas('availability', function ($query) use ($value) {
            $query->where('short_term', '=', $value);
        });
    }
}