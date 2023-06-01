<?php

namespace App\Enums;

enum Minutes: int
{
    case Less_than_5 = 1; 
    case Between_5_and_10 = 2;
    case Between_10_and_15 = 3;
    case Between_15_and_20 = 4;
    case More_than_20 = 5;

    public function text(): string
    {
        return match($this) {
            self::Less_than_5  => 'less than 5', 
            self::Between_5_and_10 => 'between 5 and 10', 
            self::Between_10_and_15 => 'between 10 and 15', 
            self::Between_15_and_20 => 'between 15 and 20', 
            self::More_than_20 => 'more than 20',
        };
    }
}