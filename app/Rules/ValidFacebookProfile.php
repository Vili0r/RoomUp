<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidFacebookProfile implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $pattern = "/^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9(\.\?)?]/";

        // Check if the value matches the pattern
        if (!preg_match($pattern, $value)) {
            // If it doesn't match, call the $fail closure with a custom message
            $fail('The :attribute is not a valid Facebook profile URL.');
        }
    }
}
