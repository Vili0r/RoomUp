<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FlatmateResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'new_flatmate_min_age' => $this->new_flatmate_min_age,
            'new_flatmate_max_age' => $this->new_flatmate_max_age,
            'new_flatmate_smoker' => $this->new_flatmate_smoker,
            'new_flatmate_pets' => $this->new_flatmate_pets,
            'new_flatmate_references' => $this->new_flatmate_references,
            'new_flatmate_couples' => $this->new_flatmate_couples,
            'new_flatmate_occupation' => $this->new_flatmate_occupation,
            'new_flatmate_gender' => $this->new_flatmate_gender,
            'new_flatmate_hobbies' => $this->new_flatmate_hobbies,
        ];
    }
}
