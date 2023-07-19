<?php

namespace App\Models;

use App\Enums\DaysAvailable;
use App\Enums\MaximumStay;
use App\Enums\MinimumStay;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Availability extends Model
{
    use HasFactory;

    protected $fillable = [
        'available_from',
        'minimum_stay',
        'maximum_stay',
        'days_available',
        'short_term',
        'owner_id',
        'owner_type',
    ];

    protected $casts = [
        'available_from' => 'datetime:Y-m-d',
        'minimum_stay' => MinimumStay::class,
        'maximum_stay' => MaximumStay::class,
        'days_available' => DaysAvailable::class,
    ];

    public function owner(): MorphTo
    {
        return $this->morphTo();
    }
}
