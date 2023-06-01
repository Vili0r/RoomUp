<?php

namespace App\Enums;

enum CurrentOccupants: int
{
    case Zero = 0; 
    case One = 1;
    case Two = 2;
    case Three = 3;
    case Four = 4;
    case Five = 5;
    case Six = 6;
    case Seven = 7;
    case Eight = 8;
    case Nine = 9;
    case Ten = 10;

    public function text(): string
    {
        return match($this) {
            self::Zero  => '0', 
            self::One => '1', 
            self::Two => '2', 
            self::Three => '3', 
            self::Four => '4', 
            self::Five => '5', 
            self::Six => '6', 
            self::Seven => '7', 
            self::Eight => '8', 
            self::Nine => '9', 
            self::Ten => '10', 
        };
    }
}