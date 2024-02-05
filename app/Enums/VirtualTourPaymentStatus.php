<?php

namespace App\Enums;

enum VirtualTourPaymentStatus: int
{
    case Successful  = 1; 
    case Failed = 2; 
    case Pending = 3; 
    
    public function text(): string
    {
        return match($this) {
            self::Successful => 'Successful', 
            self::Failed  => 'Failed', 
            self::Pending  => 'Pending', 
        };
    }
}