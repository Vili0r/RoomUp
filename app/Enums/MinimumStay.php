<?php

namespace App\Enums;

enum MinimumStay: int
{
    case No_Minimum = 0; 
    case One_month = 1;
    case Two_months = 2;
    case Three_months = 3;
    case Four_months = 4;
    case Five_months = 5;
    case Six_months = 6;
    case Seven_months = 7;
    case Eight_months = 8;
    case Nine_months = 9;
    case Ten_months = 10;
    case Eleven_months = 11;
    case One_year = 12;
    case More_than_one_year = 13;
    case Two_years = 14;
    case More_than_two_years = 15;
    case Three_years = 16;

    public function text(): string
    {
        return match($this) {
            self::No_Minimum  => 'No Minimum', 
            self::One_month => '1 month', 
            self::Two_months => '2 months', 
            self::Three_months => '3 months', 
            self::Four_months => '4 months', 
            self::Five_months => '5 months', 
            self::Six_months => '6 months', 
            self::Seven_months => '7 months', 
            self::Eight_months => '8 months', 
            self::Nine_months => '9 months', 
            self::Ten_months => '10 months', 
            self::Eleven_months => '10 months', 
            self::One_year => '1 year', 
            self::More_than_one_year => '>1', 
            self::Two_years => '2 years', 
            self::More_than_two_years => '>2', 
            self::Three_years => '3 years', 
        };
    }
}