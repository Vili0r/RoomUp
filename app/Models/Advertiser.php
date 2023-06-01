<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Laravel\Scout\Searchable;

class Advertiser extends Model
{
    use HasFactory, Searchable;

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


    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'display_last_name' => $this->display_last_name,
            'telephone' => $this->telephone,
            'display_telephone' => $this->display_telephone,
        ];
    }
}
