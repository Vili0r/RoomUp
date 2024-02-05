<?php

namespace App\Models;

use App\Enums\VirtualTourPaymentStatus;
use App\Enums\VirtualTourStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class VirtualTour extends Model
{
    use HasFactory;

    protected $fillable = [
        'contact_name',
        'email',
        'contact_number',
        'details',
        'status',
        'payment_status',
        'payment_session_id',
        'owner_id',
        'owner_type',
        'completed_at',
    ];

    protected $casts = [
        'completed_at' => 'datetime',
        'status' => VirtualTourStatus::class,
        'payment_status' => VirtualTourPaymentStatus::class,
    ];

    public function owner(): MorphTo
    {
        return $this->morphTo();
    }
}
