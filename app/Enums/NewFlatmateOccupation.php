<?php

namespace App\Enums;

enum NewFlatmateOccupation: int
{
    case No_preference = 1; 
    case Student = 2;
    case Professional = 3;

    public function text(): string
    {
        return match($this) {
            self::No_preference  => 'No preference', 
            self::Student => 'Student', 
            self::Professional => 'Professional', 
        };
    }
}