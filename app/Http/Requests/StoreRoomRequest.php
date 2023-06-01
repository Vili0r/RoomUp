<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRoomRequest extends FormRequest
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
            'title' => ['required'],
            'description' => ['required'],
            'avalable_rooms' => ['required'],
            'size' => ['required'],
            'type' => ['required'],
            'current_occupants' => ['required'],
            'what_i_am' => ['required'],
            'room_size' => ['required'],
            'room_cost' => ['required'],
            'room_deposit' => ['required'],
            'bills' => ['required'],
        ];
    }
}
