<?php

namespace App\Models;

use App\Enums\ReportedListingReason;
use App\Enums\ReportedListingStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class ReportedListing extends Model
{
    use HasFactory;

    protected $fillable = [
        'contact_name',
        'email',
        'reason',
        'details',
        'status',
        'owner_id',
        'owner_type',
        'resolved_at',
    ];

    protected $casts = [
        'resolved_at' => 'datetime',
        'status' => ReportedListingStatus::class,
        'reason' => ReportedListingReason::class,
    ];

    public function owner(): MorphTo
    {
        return $this->morphTo();
    }
}
