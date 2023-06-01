<?php

namespace App\Enums;

enum Pets: int
{
    case No = 1; 
    case Yes = 2;

    public function text(): string
    {
        return match($this) {
            self::No  => 'No', 
            self::Yes => 'Yes', 
        };
    }
}