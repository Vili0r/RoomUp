<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RoomUpdateRequest extends FormRequest
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
            'sub_title' => ['required', 'min:10', 'max:25'],
            'sub_description' => ['required', 'min:50', 'max:250'],
            'room_size' => ['required'],
            'room_cost' => ['required'],
            'room_deposit' => ['required'],
            'room_furnished' => ['required'],
            'room_references' => ['sometimes'],
            'available_from' => ['required', 'after:today'],
            'minimum_stay' => ['required'],
            'maximum_stay' => ['required','gt:minimum_stay'],
            'days_available' => ['required'],
            'short_term' => ['sometimes'],
            'images' => ['sometimes', 'max:9'],
        ];
    }
}
