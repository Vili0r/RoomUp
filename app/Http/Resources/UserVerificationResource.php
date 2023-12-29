<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserVerificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'last_name_verified_at' => $this->last_name_verified_at ? $this->last_name_verified_at->format('Y-m-d') : null,
            'email_verified_at' => $this->email_verified_at ? $this->email_verified_at->format('Y-m-d') : null,
            'phone_verified_at' => $this->phone_verified_at ? $this->phone_verified_at->format('Y-m-d') : null,
            'social_media_verified_at' => $this->social_media_verified_at ? $this->social_media_verified_at->format('Y-m-d') : null,
            'photo_verified_at' => $this->photo_verified_at ? $this->photo_verified_at->format('Y-m-d') : null,
            'selfie_verified_at' => $this->selfie_verified_at ? $this->selfie_verified_at->format('Y-m-d') : null,
            'id_document_verified_at' => $this->id_document_verified_at ? $this->id_document_verified_at->format('Y-m-d') : null,
            'profile_verified_at' => $this->profile_verified_at ? $this->profile_verified_at->format('Y-m-d') : null,
        ];
    }
}
