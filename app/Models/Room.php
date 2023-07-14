<?php

namespace App\Models;

use App\Enums\Furnishings;
use App\Enums\RoomSize;
use App\Enums\DaysAvailable;
use App\Enums\MaximumStay;
use App\Enums\MinimumStay;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Laravel\Scout\Searchable;

class Room extends Model
{
    use HasFactory, Searchable;

    protected $fillable = [
        'sub_title',
        'sub_description',
        'room_size',
        'room_cost',
        'room_deposit',
        'room_furnished',
        'room_references',
        'available_from',
        'minimum_stay',
        'maximum_stay',
        'days_available',
        'short_term',
        'available',
        'live_at',
        'images',
        'owner_id',
        'owner_type',
    ];

    protected $casts = [
        'available_from' => 'datetime:Y-m-d',
        'live_at' => 'datetime:Y-m-d',
        'room_size' => RoomSize::class,
        'room_furnished' => Furnishings::class,
        'minimum_stay' => MinimumStay::class,
        'maximum_stay' => MaximumStay::class,
        'days_available' => DaysAvailable::class,
        'images' => 'array',
    ];

    public function owner(): MorphTo
    {
        return $this->morphTo();
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
            'sub_title' => $this->sub_title,
            'sub_description' => $this->sub_desctiption,
            'room_size' => $this->room_size,
            'room_cost' => $this->room_cost,
            'room_deposit' => $this->room_deposit,
            'room_furnished' => $this->room_furnished,
            'room_references' => $this->room_references,
            'available_from' => $this->available_from->format('Y-m-d'),
            'minimum_stay' => $this->minimum_stay,
            'maximum_stay' => $this->maximum_stay,
            'days_available' => $this->days_available,
            'short_term' => $this->short_term,
            'images' => $this->images,
            'owner' => [
                'title' => $this->owner->title,
                'description' => $this->owner->description,
            ],
            'address' => [
                'id' => $this->owner->address->id,
                'address_1' => $this->owner->address->address_1,
                'address_2' => $this->owner->address->address_2,
                'area' => $this->owner->address->area,
                'city' => $this->owner->address->city,
                'post_code' => $this->owner->address->post_code,
            ]
        ];
    }
}
