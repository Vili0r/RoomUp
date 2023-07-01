<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Conversation extends Model
{
    use HasFactory;

    protected $casts = [
        'last_reply' => 'datetime:Y-m-d',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function usersExceptCurrentlyAuthenticated()
    {
        return $this->user()->where('user_id', '!=', auth()->id());
    }
    
    public function message(): BelongsTo
    {
        return $this->belongsTo(Message::class);
    }
    
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Conversation::class, 'message_id');
    }

    public function replies(): HasMany
    {
        return $this->hasMany(Conversation::class, 'message_id')->latestFirst();
    }

    public function touchLastReply()
    {
        $this->last_reply = \Carbon\Carbon::now();
        $this->save();
    }

    public function isReply()
    {
        return $this->message_id !== null;
    }

    public function scopeLatestFirst($query)
    {
        return $query->orderBy('created_at', 'desc');
    }
}
