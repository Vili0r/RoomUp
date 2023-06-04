<?php

namespace App\Enums;

enum Size: int
{
    case One_Bed = 1; 
    case Two_Bed = 2; 
    case Three_Bed = 3;
    case Four_Bed = 4;
    case Five_Bed = 5;
    case More_Than_Six_Beds = 6;

    public function text(): string
    {
        return match($this) {
            self::One_Bed  => '1 bed', 
            self::Two_Bed  => '2 bed', 
            self::Three_Bed => '3 bed', 
            self::Four_Bed => '4 bed', 
            self::Five_Bed => '5 bed', 
            self::More_Than_Six_Beds => '6+ bed', 
        };
    }
}