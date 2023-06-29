<?php

namespace App\Models;

use App\Enums\AvailableRooms;
use App\Enums\CurrentFlatmateGender;
use App\Enums\CurrentFlatmateOccupation;
use App\Enums\CurrentFlatmateSmoking;
use App\Enums\CurrentOccupants;
use App\Enums\Pets;
use App\Enums\WhatIAm;
use App\Enums\Size;
use App\Enums\Type;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\FilterByUser;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Support\Facades\Auth;

class Shared extends Model
{
    use HasFactory, SoftDeletes, FilterByUser, Searchable;

    protected $fillable = [
        'title',
        'description',
        'available_rooms',
        'size',
        'type',
        'current_occupants',
        'what_i_am',
        'user_id',
        'live_at',
        'featured',
        'available',
        'current_flatmate_age',
        'current_flatmate_smoker',
        'current_flatmate_pets',
        'current_flatmate_occupation',
        'current_flatmate_gender',
        'current_flatmate_hobbies',
        'images',
    ];

    protected $casts = [
        'current_flatmate_hobbies' => 'array',
        'live_at' => 'datetime:Y-m-d',
        'what_i_am' => WhatIAm::class,
        'size' => Size::class,
        'type' => Type::class,
        'avalable_rooms' => AvailableRooms::class,
        'current_occupants' => CurrentOccupants::class,
        'current_flatmate_smoker' => CurrentFlatmateSmoking::class,
        'current_flatmate_pets' => Pets::class,
        'current_flatmate_occupation' => CurrentFlatmateOccupation::class,
        'current_flatmate_gender' => CurrentFlatmateGender::class,
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
    
    public function advertiser(): MorphOne
    {
        return $this->morphOne(Advertiser::class, 'owner');
    }

    public function transport(): MorphOne
    {
        return $this->morphOne(Transport::class, 'owner');
    }
    
    public function flatmate(): MorphOne
    {
        return $this->morphOne(Flatmate::class, 'owner');
    }

    public function rooms(): MorphMany
    {
        return $this->morphMany(Room::class, 'owner');
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
            'size' => $this->size,
            'type' => $this->type,
            'images' => $this->images,
            'available_rooms' => $this->available_rooms,
            'created_at' => $this->created_at->format('Y-m-d'),
        ];
    }
}