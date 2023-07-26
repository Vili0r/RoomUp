<?php

namespace App\Http\QueryFilters\RoommateQueryFilters;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class RoommateHobbiesQueryFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        if (is_string($value)) {
            $value = explode(',', $value);
        }
        if (is_array($value)) {
            $query->whereHas('hobbies', function ($query) use ($value) {
                $query->whereIn('id', $value);
            });
        } else {
            $query->whereHas('hobbies', function ($query) use ($value) {
                $query->where('id', $value);
            });
        }
    }
}