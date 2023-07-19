<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Advertiser extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'display_last_name',
        'telephone',
        'display_telephone',
        'owner_id',
        'owner_type',
    ];

    public function owner(): MorphTo
    {
        return $this->morphTo();
    }
}
