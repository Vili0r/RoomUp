<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Blog extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable =[
        'title',
        'image',
        'slug',
        'body',
        'published_at',
        'featured',
        'author_id',
        'category_id',
    ];

    protected $casts = [
        'published_at' => 'datetime:Y-m-d',
    ];

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function scopeFeatured($query)
    {
        $query->where('featured', 1);
    }

    public function scopePublished($query)
    {
        $query->whereNotNull('published_at')->where('published_at', '<=', new \DateTime());
    }
}
