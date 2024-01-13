<?php

namespace App\Enums;

enum ReportedListingStatus: int
{
    case Pending  = 1; 
    case Reviewed = 2; 
    case Resolved = 3;
    
    public function text(): string
    {
        return match($this) {
            self::Pending => 'Pending', 
            self::Reviewed  => 'Reviewed', 
            self::Resolved => 'Resolved', 
        };
    }
}