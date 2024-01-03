<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\VerificationStatus;

class UserVerification extends Model
{
    use HasFactory;

    protected $fillable = [
        'last_name_verified_at',
        'email_verified_at',
        'phone_verified_at',
        'social_media_verified_at',
        'photo_verified_at',
        'selfie_verified_at',
        'id_document_verified_at',
        'profile_verified_at',
        'status'
    ];

    protected $casts = [
        'last_name_verified_at' => 'datetime',
        'email_verified_at' => 'datetime',
        'phone_verified_at' => 'datetime',
        'social_media_verified_at' => 'datetime',
        'photo_verified_at' => 'datetime',
        'selfie_verified_at' => 'datetime',
        'id_document_verified_at' => 'datetime',
        'profile_verified_at' => 'datetime',
        'status' => VerificationStatus::class,
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
