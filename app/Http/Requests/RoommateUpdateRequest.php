<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RoommateUpdateRequest extends FormRequest
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
            'budget' => ['required', 'numeric'],
            'searching_for' => ['required'],
            'room_size' => ['required'],
            'user_id' => ['sometimes'],
            'live_at' => ['sometimes'],
            'available' => ['sometimes'],
            'age' => ['required', 'numeric' ,'min:18'],
            'smoker' => ['required'],
            'pets' => ['required'],
            'occupation' => ['required'],
            'gender' => ['required'],
            'hobbies' => ['required', 'array', 'min:1', 'max:15'],
            'amenities' => ['required', 'array', 'min:1'],
            'area' => ['required'],
            'city' => ['required'],
            'images' => ['sometimes', 'array'],
            'available_from' => ['required', 'date', 'after:tomorrow'],
            'minimum_stay' => ['required'],
            'maximum_stay' => ['required', 'gt:minimum_stay'],
            'days_available' =>['required'], 
            'short_term' => ['sometimes'],
            'first_name' => ['required', 'max:20'],
            'last_name' => ['required', 'max:20'],
            'display_last_name' => ['sometimes'],
            'telephone' => ['required'],
            'display_telephone' => ['sometimes'],
            'new_flatmate_min_age' => ['required', 'numeric', 'min:18'],
            'new_flatmate_max_age' => [
                'required', 
                'numeric', 
                'min:18', 
                'gt:new_flatmate_min_age'
            ],
            'new_flatmate_smoker' => ['required'],
            'new_flatmate_pets' => ['required'],
            'new_flatmate_references' => ['required'],
            'new_flatmate_couples' => ['sometimes'],
            'new_flatmate_gender' => ['required'],
            'new_flatmate_occupation' => ['required'],
            'new_flatmate_hobbies' => ['sometimes'],
        ];
    }

    public function messages()
    {
        return [
            'searching_for.required' => 'The searching for field is required',
            'room_size.required' => 'The room size field is required',
            'maximum_stay.required' => 'The maximum stay is required',
            'minimum_stay.required' => 'The minimum stay is required',
            'first_name.required' => 'The first name field is required',
            'last_name.required' => 'The last name field is required',
            'days_available.required' => 'The days available field is required',
            'new_flatmate_smoker.required' => 'The new flatmate smoker field is required',
            'new_flatmate_pets.required' => 'The new flatmate pets field is required',
            'new_flatmate_occupation.required' => 'The new flatmate occupation field is required',
            'new_flatmate_gender.required' => 'The new flatmate gender field is required',
            'new_flatmate_min_age.required' => 'The new flatmate minimum age field is required',
            'new_flatmate_min_age.numeric' => 'This does not appear to be a number',
            'new_flatmate_min_age.before' => 'Your new flatmate should be more than 18 years old',
            'new_flatmate_max_age.required' => 'The new flatmate maximum age field is required',
            'new_flatmate_max_age.numeric' => 'This does not appear to be a number',
            'new_flatmate_max_age.after' => 'The :attribute must be greater than the min age',
            'new_flatmate_max_age.before' => 'Your new flatmate should be more than 18 years old',
        ];
    }
}
