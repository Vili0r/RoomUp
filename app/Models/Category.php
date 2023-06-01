<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Category extends Model
{
    use HasFactory, Searchable;

    protected $fillable =[
        'name',
        'slug'
    ];

    public function blogs()
    {
        return $this->hasMany(Blog::class);
    }
}
