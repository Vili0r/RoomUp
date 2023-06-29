<?php

namespace App\Models;

use App\Traits\FilterByUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Enums\Size;
use App\Enums\Type;
use App\Enums\WhatIAmFlat;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Support\Facades\Auth;
use Laravel\Scout\Searchable;

class Flat extends Model
{
    use HasFactory, SoftDeletes, FilterByUser, Searchable;

    protected $fillable = [
        'title',
        'description',
        'cost',
        'deposit',
        'size',
        'type',
        'live_at',
        'what_i_am',
        'furnished',
        'featured',
        'available',
        'user_id',
        'images',
    ];

    protected $casts = [
        'live_at' => 'datetime:Y-m-d',
        'size' => Size::class,
        'type' => Type::class,
        'what_i_am' => WhatIAmFlat::class,
        'images' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function amenities(): BelongsToMany
    {
        return $this->belongsToMany(Amenity::class);
    }

    public function address(): MorphOne
    {
        return $this->morphOne(Address::class, 'owner');
    }
    
    public function transport(): MorphOne
    {
        return $this->morphOne(Transport::class, 'owner');
    }
    
    public function advertiser(): MorphOne
    {
        return $this->morphOne(Advertiser::class, 'owner');
    }
     
    public function flatmate(): MorphOne
    {
        return $this->morphOne(Flatmate::class, 'owner');
    }
    
    public function availability(): MorphOne
    {
        return $this->morphOne(Availability::class, 'owner');
    }

    public function favourites(): MorphToMany
    {
        return $this->morphToMany(User::class, 'favouriteable');
    }

    public function favouritedBy(?User $user)
    {
        if ($user === null) {
            return false;
        }
        
        return $this->favourites->contains($user);
    }

    public function viewedUsers(): MorphToMany
    {
        return $this->morphToMany(User::class, 'viewable')
                ->withTimestamps()
                ->withPivot(['count']);
    }

    public function views()
    {
        return array_sum($this->viewedUsers->pluck('pivot.count')->toArray());
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'cost' => $this->cost,
            'deposit' => $this->deposit,
            'size' => $this->size,
            'type' => $this->type,
            'furnished' => $this->furnished,
            'images' => $this->images,
            'created_at' => $this->created_at->format('Y-m-d'),
        ];
    }

    public function scopeMaxPrice(Builder $query, $price): Builder
    {
        return $query->where('cost', '<=', $price);
    }
}
