<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FlatStoreRequest extends FormRequest
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
            'amenities' => ['required'],
            'address_1' => ['required'],
            'address_2' => ['sometimes'],
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
            'available_from' => ['required', 'date', 'after:today'],
            'minimum_stay' => ['required'],
            'maximum_stay' => ['required'],
            'days_available' =>['required'], 
            'short_term' => ['sometimes'],
            'title' => ['required', 'min:10', 'max:50'],
            'description' => ['required', 'min:50', 'max:500'],
            'cost' => ['required', 'numeric'],
            'deposit' => ['required', 'numeric'],
            'size' => ['required', 'integer'],
            'type' => ['required', 'integer'],
            'live_at' => ['sometimes'],
            'what_i_am' => ['required'],
            'furnished' => ['required'],
            'featured' => ['sometimes'],
            'available' => ['sometimes'],
            'user_id' => ['sometimes'],
            'images' => ['required', 'array'],
        ];
    }
}
