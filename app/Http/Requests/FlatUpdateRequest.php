<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FlatUpdateRequest extends FormRequest
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
            'title' => ['required', 'min:10', 'max:50'],
            'description' => ['required',  'min:50', 'max:500'],
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
            'images' => ['sometimes', 'max:9'],
            'address_1' => ['required', 'max:30'],
            'address_2' => ['sometimes'],
            'area' => ['required', 'max:20'],
            'city' => ['required', 'max:20'],
            'post_code' => ['required', 'max:7'],
            'minutes' => ['required'],
            'mode' => ['required'],
            'station' => ['required'],
            'first_name' => ['required', 'max:20'],
            'last_name' => ['required', 'max:20'],
            'display_last_name' => ['sometimes'],
            'telephone' => ['required'],
            'display_telephone' => ['sometimes'],
            'station' => ['required'],
            'new_flatmate_min_age' => [
                'required', 
                'numeric', 
                'min:18'
            ],
            'new_flatmate_max_age' => [
                'required', 
                'numeric', 
                'min:18',
                'gt:new_flatmate_min_age'
            ],
            'new_flatmate_smoker' => ['required'],
            'new_flatmate_pets' => ['sometimes'],
            'new_flatmate_references' => ['sometimes'],
            'new_flatmate_couples' => ['sometimes'],
            'new_flatmate_gender' => ['required'],
            'new_flatmate_occupation' => ['required'],
            'new_flatmate_hobbies' => ['sometimes'],
            'available_from' => ['required', 'after:tomorrow'],
            'days_available' => ['required'],
            'maximum_stay' => ['required','gt:minimum_stay'],
            'minimum_stay' => ['required'],
            'short_term' => ['sometimes'],
            'amenities' => ['required'],
        ];
    }

    public function messages()
    {
        return [
            'available_from.required' => 'The Available From field is required',
            'days_available.required' => 'The Days Available field is required',
            'maximum_stay.required' => 'The Maximum Stay field is required',
            'maximum_stay.gt' => 'The Maximum Stay field must be greater than the Minimum Stay field',
            'minimum_stay.required' => 'The Minimum Stay field is required',
            'new_flatmate_smoker.required' => 'The New Flatmate Smoker field is required',
            'new_flatmate_pets.required' => 'The New Flatmate Pets field is required',
            'new_flatmate_occupation.required' => 'The New Flatmate Occupation field is required',
            'new_flatmate_gender.required' => 'The New Flatmate Gender field is required',
            'new_flatmate_min_age.required' => 'The New Flatmate Minimum Age field is required',
            'new_flatmate_min_age.numeric' => 'The New Flatmate Minimum Age must be a number',
            'new_flatmate_min_age.before' => 'Your new flatmate should be more than 18 years old',
            'new_flatmate_max_age.required' => 'The New Flatmate Maximum Age field is required',
            'new_flatmate_max_age.numeric' => 'The New Flatmate Maximum Age must be a number',
            'new_flatmate_max_age.after' => 'The :attribute must be greater than the minimum age',
            'new_flatmate_max_age.before' => 'Your new flatmate should be more than 18 years old',
            'post_code.required' => 'The Post Code field is required',
            'address_1.required' => 'The Address field is required',
            'what_i_am.required' => 'Your current status field is required',
            'first_name.required' => 'The First Name field is required',
            'last_name.required' => 'The Last Name field is required',
        ];
    }
}
