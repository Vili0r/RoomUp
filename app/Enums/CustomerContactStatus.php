<?php

namespace App\Enums;

enum CustomerContactStatus: int
{
    case Pending  = 1; 
    case Completed = 2;
    case Cancelled = 3;
    
    public function text(): string
    {
        return match($this) {
            self::Pending => 'Pending', 
            self::Completed => 'Completed', 
            self::Cancelled => 'Cancelled', 
        };
    }
}