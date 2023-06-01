<?php

namespace App\Models;

use App\Enums\Minutes;
use App\Enums\Mode;
use App\Enums\Stations;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Laravel\Scout\Searchable;


class Transport extends Model
{
    use HasFactory, Searchable;

    protected $fillable = [
        'minutes',
        'mode',
        'station',
        'owner_id',
        'owner_type', 
    ];

    protected $casts = [
        'minutes' => Minutes::class,
        'mode' => Mode::class,
        'Stations' => Stations::class,
    ];

    public function owner(): MorphTo
    {
        return $this->morphTo();
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'minutes' => $this->minutes,
            'mode' => $this->mode,
            'station' => $this->station,
        ];
    }
}
