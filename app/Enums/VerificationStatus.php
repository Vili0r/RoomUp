<?php

namespace App\Enums;

enum VerificationStatus: int
{
    case Unverified  = 1; 
    case Verified = 2; 
    case Pending = 3;
    case Cancelled = 3;
    
    public function text(): string
    {
        return match($this) {
            self::Unverified => 'Unverified', 
            self::Verified  => 'Verified', 
            self::Pending => 'Pending', 
            self::Cancelled => 'Cancelled', 
        };
    }
}