<?php

namespace App\Models;

use App\Enums\DaysAvailable;
use App\Enums\MaximumStay;
use App\Enums\MinimumStay;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Laravel\Scout\Searchable;

class Availability extends Model
{
    use HasFactory, Searchable;

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

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'available_from' => $this->available_from->format('Y-m-d'),
            'minimum_stay' => $this->minimum_stay,
            'maximum_stay' => $this->maximum_stay,
            'days_available' => $this->days_available,
            'short_term' => $this->short_term,
        ];
    }
}
