<?php

namespace App\Enums;

enum Type: int
{
    case Flat_Apartment = 1; 
    case House = 2; 
    case Property = 3;

    public function text(): string
    {
        return match($this) {
            self::Flat_Apartment=> 'Flat/Apartment', 
            self::House  => 'House', 
            self::Property => 'Property', 
        };
    }
}