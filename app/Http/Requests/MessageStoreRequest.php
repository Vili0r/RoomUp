<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MessageStoreRequest extends FormRequest
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
            'full_name' => ['string', 'required', 'max:255'],
            'email' => ['string', 'required', 'email', 'max:255'],
            'message_text' => ['required', 'max:500'],
            'phone_number' => ['required', 'max_digits:12'],
            'owner_type' => ['required', 'string', 'in:flat,room,roommate'],
        ];
    }
}
