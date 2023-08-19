<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Traits\PivotOrderableTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Laravel\Scout\Searchable;
use Illuminate\Database\Query\Builder;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, Searchable, PivotOrderableTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'avatar',
        'gender',
        'birthdate',
        'looking_for'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'birthdate' => 'datetime:Y-m-d',
    ];

    public function socials(): HasMany
    {
        return $this->hasMany(Social::class);
    }
    
    public function shareds(): HasMany
    {
        return $this->hasMany(Shared::class);
    }
    
    public function flats(): HasMany
    {
        return $this->hasMany(Flat::class);
    }
    
    public function roommates(): HasMany
    {
        return $this->hasMany(Roommate::class);
    }

    public function favouriteFlats(): MorphToMany
    {
        return $this->morphedByMany(Flat::class, 'favouriteable')
                ->withTimestamps();
    }
    
    public function favouriteShareds(): MorphToMany
    {
        return $this->morphedByMany(Shared::class, 'favouriteable')
                ->withTimestamps();
    }
    
    public function favouriteRooms(): MorphToMany
    {
        return $this->morphedByMany(Room::class, 'favouriteable')
                ->withTimestamps();
    }
    
    public function favouriteRoommates(): MorphToMany
    {
        return $this->morphedByMany(Roommate::class, 'favouriteable')
                ->withTimestamps();
    }
    
    public function viewedFlats(): MorphToMany
    {
        return $this->morphedByMany(Flat::class, 'viewable')
                ->withTimestamps()
                ->withPivot(['count', 'id']);//if you want to increment on a pivot table you have to add 'id'
    }
    
    public function viewedShareds(): MorphToMany
    {
        return $this->morphedByMany(Shared::class, 'viewable')
                ->withTimestamps()
                ->withPivot(['count', 'id']);//if you want to increment on a pivot table you have to add 'id'
    }
    
    public function viewedRooms(): MorphToMany
    {
        return $this->morphedByMany(Room::class, 'viewable')
                ->withTimestamps()
                ->withPivot(['count', 'id']);//if you want to increment on a pivot table you have to add 'id'
    }
    
    public function viewedRoommates(): MorphToMany
    {
        return $this->morphedByMany(Roommate::class, 'viewable')
                ->withTimestamps()
                ->withPivot(['count', 'id']);//if you want to increment on a pivot table you have to add 'id'
    }

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }
    
    public function conversations(): BelongsToMany
    {
        return $this->belongsToMany(Conversation::class)
                ->orderBy('last_reply', 'desc');
    }

    public function isInConversation(Conversation $conversation)
    {
        return $this->conversations->contains($conversation);
    }

    public function blogs(): HasMany
    {
        return $this->hasMany(Blog::class, 'author_id');
    }
}
