<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserFrontEndResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id, 
            'first_name' => $this->first_name, 
            'roles' => $this->getRoleNames(),
            'permissions' => $this->getPermissionNames(),
            'avatar' => $this->avatar,
        ];
    }
}
