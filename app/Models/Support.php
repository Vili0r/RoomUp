<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Support extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'status',
        'last_active_at',
    ];

    protected $casts = [
        'last_active_at' => 'datetime'
    ];

    public function messages(): MorphMany
    {
        return $this->morphMany(Message::class, 'owner');
    }
}
