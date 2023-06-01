<?php

namespace App\Enums;

enum WhatIAm: int
{
    case Live_In_Landlord = 1; 
    case Live_Out_Landlord = 2; 
    case Current_Tenant = 3;
    case Agent = 4;
    case Former_flatmate = 5;

    public function text(): string
    {
        return match($this) {
            self::Live_In_Landlord => 'Live in landlord', 
            self::Live_Out_Landlord  => 'Live out landlord', 
            self::Current_Tenant => 'Current tenant/flatmate', 
            self::Agent => 'Agent', 
            self::Former_flatmate => 'Former flatmate', 
        };
    }
}