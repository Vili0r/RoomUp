<?php

namespace App\Models;

use App\Enums\CurrentFlatmateGender;
use App\Enums\CurrentFlatmateOccupation;
use App\Enums\CurrentFlatmateSmoking;
use App\Enums\Pets;
use App\Traits\FilterByUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;

class RoomWanted extends Model
{
    use HasFactory, SoftDeletes, FilterByUser, Searchable;

    protected $fillable = [
        'title',
        'description',
        'budget',
        'searching_for',
        'live_at',
        'available',
        'age',
        'smoker',
        'pets',
        'occupation',
        'gender',
        'second_gender',
        'hobbies',
        'area',
        'city',
        'user_id',
        'images',
    ];

    protected $casts = [
        'live_at' => 'datetime:Y-m-d',
        'smoker' => CurrentFlatmateSmoking::class,
        'pets' => Pets::class,
        'occupation' => CurrentFlatmateOccupation::class,
        'gender' => CurrentFlatmateGender::class,
        'images' => 'array',
        'hobbies' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function amenities(): BelongsToMany
    {
        return $this->belongsToMany(Amenity::class);
    }
    
    public function hobbies(): BelongsToMany
    {
        return $this->belongsToMany(Hobby::class);
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

    public function messages(): MorphMany
    {
        return $this->morphMany(Message::class, 'owner');
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
            'address' => [
                'id' => $this->address->id,
                'address_1' => $this->address->address_1,
                'address_2' => $this->address->address_2,
                'area' => $this->address->area,
                'city' => $this->address->city,
                'post_code' => $this->address->post_code,
            ],
        ];
    }
}
