<?php

namespace App\Enums;

enum DaysAvailable: int
{
    case Full_week = 1; 
    case From_monday_to_friday_only = 2;
    case Weekends_only = 3;

    public function text(): string
    {
        return match($this) {
            self::Full_week  => 'Full week', 
            self::From_monday_to_friday_only  => 'Mon to Friday only',  
            self::Weekends_only  => 'Weekends only',  
        };
    }
}