<?php

namespace App\Http\QueryFilters\Api;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class RoommateQueryFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
       
    }
}