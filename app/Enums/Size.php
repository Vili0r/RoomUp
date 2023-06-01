<?php

namespace App\Enums;

enum Size: int
{
    case One_Bed = 1; 
    case Two_Bed = 2; 
    case Three_Bed = 3;
    case Four_Bed = 4;
    case Five_Bed = 5;
    case Six_Bed = 6;
    case Seven_Bed = 7;
    case Eight_Bed = 8;
    case Nine_Bed = 9;
    case Ten_Bed = 10;

    public function text(): string
    {
        return match($this) {
            self::One_Bed  => '1 bed', 
            self::Two_Bed  => '2 bed', 
            self::Three_Bed => '3 bed', 
            self::Four_Bed => '4 bed', 
            self::Five_Bed => '5 bed', 
            self::Six_Bed => '6 bed', 
            self::Seven_Bed => '7 bed', 
            self::Eight_Bed => '8 bed', 
            self::Nine_Bed => '9 bed', 
            self::Ten_Bed => '10 bed', 
        };
    }
}