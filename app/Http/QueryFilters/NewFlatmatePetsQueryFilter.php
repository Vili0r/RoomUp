<?php

namespace App\Http\QueryFilters;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class NewFlatmatePetsQueryFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $query->whereHas('flatmate', function ($query) use ($value) {
            $query->where('new_flatmate_pets', $value);
        });
    }
}