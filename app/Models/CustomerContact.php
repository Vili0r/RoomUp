<?php

namespace App\Models;

use App\Enums\CustomerContactStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerContact extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'reason',
        'details',
        'resolved_at',
        'status'
    ];

    protected $casts = [
        'resolved_at' => 'datetime',
        'status' => CustomerContactStatus::class,
    ];
}
