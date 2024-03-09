<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SharedUpdateRequest extends FormRequest
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
            'description' => ['required', 'min:50', 'max:500'],
            'available_rooms' => ['required', 'integer'],
            'size' => ['required', 'integer'],
            'type' => ['required', 'integer'],
            'current_occupants' => ['required', 'integer'],
            'what_i_am' => ['required', 'integer'],
            'user_id' => ['sometimes'],
            'live_at' => ['sometimes'],
            'featured' => ['sometimes'],
            'available' => ['sometimes'],
            'current_flatmate_age' => ['sometimes'],
            'current_flatmate_smoker' => ['sometimes', 'integer'],
            'current_flatmate_pets' => ['sometimes', 'integer'],
            'current_flatmate_occupation' => ['sometimes', 'integer'],
            'current_flatmate_gender' => ['sometimes', 'integer'],
            'current_flatmate_hobbies' => ['sometimes'],
            'images' => ['sometimes'],
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
            'title' => ['required', 'min:10', 'max:50'],
            'description' => ['required', 'min:50', 'max:500'],
            'available_rooms' => [
                'required', 
                'numeric', 
                function ($attribute, $value, $fail) {
                    $difference = $this->input('size') - $this->input('current_occupants');
                    if ($value > $difference) {
                        $fail('Available rooms must be smaller than the difference between Size and Current tenants.');
                    }
                },
            ],
            'size' => ['required', 'gte:available_rooms'],
            'type' => ['required'],
            'current_occupants' => ['required', 'lte:size'],
            'what_i_am' => ['required'],
            'user_id' => ['sometimes'],
            'live_at' => ['sometimes'],
            'featured' => ['sometimes'],
            'available' => ['sometimes'],
            'current_flatmate_age' => [
                'required_if:current_occupants,>=,1', 
                'numeric',
                'min:18'
            ],
            'current_flatmate_smoker' => ['required_if:current_occupants,>=,1'],
            'current_flatmate_pets' => ['required_if:current_occupants,>=,1'],
            'current_flatmate_occupation' => ['required_if:current_occupants,>=,1'],
            'current_flatmate_gender' => ['required_if:current_occupants,>=,1'],
            'current_flatmate_hobbies' => ['sometimes'],
            'images' => ['sometimes', 'max:9'],
            'amenities' => ['required'],
            'rooms' => ['required', 'array'],
            'rooms.*' => ['array'],
            'rooms.*.room_cost' => ['required', 'numeric'],
            'rooms.*.room_deposit' => ['required', 'numeric'],
            'rooms.*.room_furnished' => ['required'],
            'rooms.*.room_references' => ['sometimes'],
            'rooms.*.room_size' => ['required'],
            'rooms.*.available_from' => ['required', 'after:today'],
            'rooms.*.days_available' => ['required'],
            'rooms.*.minimum_stay' => ['required'],
            'rooms.*.maximum_stay' => ['required','gt:rooms.*.minimum_stay'],
            'rooms.*.short_term' => ['sometimes'],
        ];
    }

    public function messages()
    {
        return [
            'rooms.*.room_cost.required' => 'The room cost field in Room :position is required',
            'rooms.*.room_deposit.required' => 'The room deposit field in Room :position is required',
            'rooms.*.room_furnished.required' => 'The room furnished field in Room :position is required',
            'rooms.*.room_size.required' => 'The room size field in Room :position is required',
            'rooms.*.available_from.required' => 'The available from field in Room :position is required',
            'rooms.*.days_available.required' => 'The days available field in Room :position is required',
            'rooms.*.maximum_stay.required' => 'The maximum stay field in Room :position is required',
            'rooms.*.minimum_stay.required' => 'The minimum stay field in Room :position is required',
            'current_flatmate_age.required' => 'The current flatmate age field is required',
            'current_flatmate_age.numeric' => 'This does not appear to be a number',
            'current_flatmate_age.before' => 'Current flatmate should be more than 18 years old',
            'current_flatmate_smoker.required' => 'The current flatmate smoker field is required',
            'current_flatmate_pets.required' => 'The current flatmate pets field is required',
            'current_flatmate_occupation.required' => 'The current flatmate occupation field is required',
            'current_flatmate_gender.required' => 'The current flatmate gender field is required',
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
            'size.after' => 'The :attribute must be greater than the available rooms',
            'post_code.required' => 'The post code field is required',
            'address_1.required' => 'The address field is required',
            'available_rooms.required' => 'The available rooms field is required',
            'available_rooms.numeric' => 'This does not appear to be a number',
            'what_i_am.required' => 'Your current status field is required',
            'first_name.required' => 'The first name field is required',
            'last_name.required' => 'The last name field is required',
            'current_occupants.required' => 'The current occupants field is required',
            'current_occupants.lt' => 'The current occupants must be smaller than the size',
        ];
    }
}
