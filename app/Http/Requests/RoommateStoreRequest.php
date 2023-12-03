<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RoommateStoreRequest extends FormRequest
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
            'budget' => ['required'],
            'searching_for' => ['required'],
            'room_size' => ['required'],
            'user_id' => ['sometimes'],
            'live_at' => ['sometimes'],
            'available' => ['sometimes'],
            'age' => ['required'],
            'smoker' => ['required'],
            'pets' => ['required'],
            'occupation' => ['required'],
            'gender' => ['required'],
            'hobbies' => ['required', 'array', 'min:1', 'max:15'],
            'amenities' => ['required', 'array', 'min:1'],
            'area' => ['required'],
            'city' => ['required'],
            'images' => ['required', 'array'],
            'available_from' => ['required', 'date', 'after:today'],
            'minimum_stay' => ['required'],
            'maximum_stay' => ['required'],
            'days_available' =>['required'], 
            'short_term' => ['sometimes'],
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
        ];
    }
}
