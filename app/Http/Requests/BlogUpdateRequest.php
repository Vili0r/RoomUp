<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BlogUpdateRequest extends FormRequest
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
            'image' => ['sometimes'],
            'title' => ['required', 'min:3', 'max:100'],
            'body' => ['required', 'min:3'],
            'published_at' => ['required', 'after:tomorrow'],
            'category_id' => ['required'],
        ];
    }
}
