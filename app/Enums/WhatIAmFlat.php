<?php

namespace App\Enums;

enum WhatIAmFlat: int
{
    case Landlord = 1; 
    case Agent = 2;

    public function text(): string
    {
        return match($this) {
            self::Landlord => 'Landlord', 
            self::Agent => 'Agent',  
        };
    }
}