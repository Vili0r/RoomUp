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
use Laravel\Scout\Searchable;

class Flat extends Model
{
    use HasFactory, FilterByUser, SoftDeletes, Searchable;

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

    public static function boot()
    {
        parent::boot();

        // Disable the global scope temporarily during indexing
        if (app()->runningInConsole()) {
            static::withoutGlobalScope(FilterByUser::class)->searchable();
        }
    }

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

    public function toSearchableArray(): array
    {
        // $addresses = Flat::with('address')->get()->pluck('id');
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
            // 'amenities_ids' => $this->amenities->pluck('id')->toArray(),
            // 'address_ids' => $addresses->toArray(),
            // 'transport_ids' => $this->transport->pluck('id')->toArray(),
            // 'advertiser_ids' => $this->advertiser->pluck('id')->toArray(),
            // 'flatmate_ids' => $this->faltmate->pluck('id')->toArray(),
            // 'availability_ids' => $this->availability->pluck('id')->toArray(),
        ];
    }
}
