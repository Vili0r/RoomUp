<?php

namespace App\Enums;

enum NewFlatmateSmoking: int
{
    case No_preference = 1; 
    case No = 2;

    public function text(): string
    {
        return match($this) {
            self::No_preference  => 'No preference', 
            self::No => 'no', 
        };
    }
}