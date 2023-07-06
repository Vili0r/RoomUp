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

    protected $fillable = [
        'user_id',
        'message_id',
        'body',
        'last_reply'
    ];

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
        return $this->users()->where('user_id', '!=', auth()->id());
    }
    
    public function message(): BelongsTo
    {
        return $this->belongsTo(Message::class);
    }
    
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Conversation::class, 'parent_id');
    }

    public function replies(): HasMany
    {
        return $this->hasMany(Conversation::class, 'parent_id')->latestFirst();
    }

    public function touchLastReply()
    {
        $this->last_reply = \Carbon\Carbon::now();
        $this->save();
    }

    public function isReply()
    {
        return $this->parent_id !== null;
    }

    public function scopeLatestFirst($query)
    {
        return $query->orderBy('created_at', 'desc');
    }
}
