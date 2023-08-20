<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'content',
        'approved',
        'blog_id'
    ];

    public function scopeApproved($query)
    {
        $query->where('approved', 1);
    }

    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }
}
