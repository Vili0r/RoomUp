<?php

namespace App\Enums;

enum CurrentFlatmateGender: int
{
    case Female = 1;
    case Male = 2;

    public function text(): string
    {
        return match($this) {
            self::Female => 'Female', 
            self::Male => 'Male', 
        };
    }
}