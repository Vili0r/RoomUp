<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSharedRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'min:4', 'max:30'],
            'description' => ['required', 'min:50', 'max:1000'],
            'available_rooms' => ['required', 'numeric'],
            'size' => ['required'],
            'type' => ['required'],
            'current_occupants' => ['required'],
            'what_i_am' => ['required'],
            'user_id' => ['sometimes'],
            'live_at' => ['sometimes'],
            'featured' => ['sometimes'],
            'available' => ['sometimes'],
            'current_flatmate_age' => ['required', 'numeric'],
            'current_flatmate_smoker' => ['required'],
            'current_flatmate_pets' => ['required'],
            'current_flatmate_occupation' => ['required'],
            'current_flatmate_gender' => ['required'],
            'current_flatmate_hobbies' => ['sometimes'],
        ];
    }
}
