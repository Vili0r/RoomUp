<?php

namespace App\Enums;

enum VirtualTourStatus: int
{
    case Pending  = 1; 
    case Booked = 2; 
    case Completed = 3;
    case Cancelled = 4;
    
    public function text(): string
    {
        return match($this) {
            self::Pending => 'Pending', 
            self::Booked  => 'Booked', 
            self::Completed => 'Completed', 
            self::Cancelled => 'Cancelled', 
        };
    }
}