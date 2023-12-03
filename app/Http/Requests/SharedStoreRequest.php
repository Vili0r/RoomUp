<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SharedStoreRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
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
            'current_flatmate_age' => ['sometimes'],
            'current_flatmate_smoker' => ['sometimes'],
            'current_flatmate_pets' => ['sometimes'],
            'current_flatmate_occupation' => ['sometimes'],
            'current_flatmate_gender' => ['sometimes'],
            'current_flatmate_hobbies' => ['sometimes'],
            'images' => ['required', 'array'],
            'amenities' => ['required'],
            'address_1' => ['required'],
            'address_2' => ['sometimes'],
            'lat' => ['required'],
            'long' => ['required'],
            'area' => ['required'],
            'city' => ['required'],
            'post_code' => ['required'],
            'minutes' => ['required'],
            'mode' => ['required'],
            'station' => ['required'],
            'first_name' => ['required'],
            'last_name' => ['required'],
            'display_last_name' => ['sometimes'],
            'telephone' => ['required'],
            'display_telephone' => ['sometimes'],
            'new_flatmate_min_age' => ['required', 'numeric'],
            'new_flatmate_max_age' => ['required', 'numeric'],
            'new_flatmate_smoker' => ['required'],
            'new_flatmate_pets' => ['sometimes'],
            'new_flatmate_references' => ['sometimes'],
            'new_flatmate_couples' => ['sometimes'],
            'new_flatmate_gender' => ['required'],
            'new_flatmate_occupation' => ['required'],
            'new_flatmate_hobbies' => ['sometimes'],
            'rooms' => ['required', 'array'],
        ];
    }
}
