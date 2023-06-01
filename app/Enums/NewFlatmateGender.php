<?php

namespace App\Enums;

enum NewFlatmateGender: int
{
    case No_preference = 1; 
    case Female = 2;
    case Male = 3;

    public function text(): string
    {
        return match($this) {
            self::No_preference  => 'No preference', 
            self::Female => 'Female', 
            self::Male => 'Male', 
        };
    }
}