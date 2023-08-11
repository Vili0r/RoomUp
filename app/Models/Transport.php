<?php

namespace App\Models;

use App\Enums\Minutes;
use App\Enums\Mode;
use App\Enums\Stations;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;


class Transport extends Model
{
    use HasFactory;

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
        'station' => Stations::class,
    ];

    public function owner(): MorphTo
    {
        return $this->morphTo();
    }
}
