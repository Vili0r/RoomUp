<?php

namespace App\Enums;

enum Furnishings: int
{
    case Furnished = 1; 
    case Unfurnished = 2;

    public function text(): string
    {
        return match($this) {
            self::Furnished  => 'Furnished', 
            self::Unfurnished => 'Unfurnished', 
        };
    }
}