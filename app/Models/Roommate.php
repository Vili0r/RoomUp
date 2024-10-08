<?php

namespace App\Models;

use App\Enums\CurrentFlatmateGender;
use App\Enums\CurrentFlatmateOccupation;
use App\Enums\CurrentFlatmateSmoking;
use App\Enums\Pets;
use App\Enums\RoomSize;
use App\Enums\SearchingFor;
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
use Illuminate\Database\Eloquent\Builder;

class Roommate extends Model
{
    use HasFactory, SoftDeletes, FilterByUser, Searchable;

    protected $fillable = [
        'title',
        'description',
        'budget',
        'searching_for',
        'room_size',
        'live_at',
        'available',
        'age',
        'smoker',
        'pets',
        'occupation',
        'gender',
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
        'room_size' => RoomSize::class,
        'searching_for' => SearchingFor::class,
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

    public function reported(): MorphMany
    {
        return $this->morphMany(ReportedListing::class, 'owner');
    }

    public function scopeMaxBudget(Builder $query, $value): Builder
    {
        $value = intval($value);
        return $query->where('budget', '<=', $value);
    }
    
    public function scopeMinBudget(Builder $query, $value): Builder
    {
        $value = intval($value);
        return $query->where('budget', '>=', $value);
    }
    
    public function scopeMaxAge(Builder $query, $age): Builder
    {
        $age = intval($age);
        return $query->where('age', '<=', $age);
    }
    
    public function scopeMinAge(Builder $query, $age): Builder
    {
        $age = intval($age);
        return $query->where('age', '>=', $age);
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'budget' => $this->budget,
            'city' => $this->city,
            'area' => $this->area,
            'room_size' => $this->room_size,
        ];
    }
}
