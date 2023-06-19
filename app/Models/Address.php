<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Laravel\Scout\Searchable;

class Address extends Model
{
    use HasFactory, Searchable;

    protected $fillable = [
        'address_1',
        'address_2',
        'area',
        'city',
        'post_code',
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
            'address_1' => $this->address_1,
            'address_2' => $this->address_2,
            'area' => $this->area,
            'city' => $this->city,
            'post_code' => $this->post_code,
            'owner' => [
                'id' => $this->owner->id,
                'title' => $this->owner->title,
                'description' => $this->owner->description,
                'cost' => $this->owner->cost ?? '',
                'size' => $this->owner->size,
                'type' => $this->owner->type,
                'images' => $this->owner->images,
                'created_at' => $this->owner->created_at->format('Y-m-d'),  
            ],
        ];
    }
}
