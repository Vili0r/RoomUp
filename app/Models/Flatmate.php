<?php

namespace App\Models;

use App\Enums\NewFlatmateGender;
use App\Enums\NewFlatmateSmoking;
use App\Enums\NewFlatmateOccupation;
use App\Enums\Pets;
use App\Enums\References;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Flatmate extends Model
{
    use HasFactory;

    protected $fillable = [
        'new_flatmate_min_age',
        'new_flatmate_max_age',
        'new_flatmate_smoker',
        'new_flatmate_pets',
        'new_flatmate_references',
        'new_flatmate_couples',
        'new_flatmate_occupation',
        'new_flatmate_gender',
        'new_flatmate_hobbies',
        'owner_id',
        'owner_type',
    ];

    protected $casts = [
        'new_flatmate_hobbies' => 'array',
        'new_flatmate_smoker' => NewFlatmateSmoking::class,
        'new_flatmate_gender' => NewFlatmateGender::class,
        'new_flatmate_occupation' => NewFlatmateOccupation::class,
        'new_flatmate_pets' => Pets::class,
    ];

    public function owner(): MorphTo
    {
        return $this->morphTo();
    }
}
