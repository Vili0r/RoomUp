<?php

namespace App\Enums;

enum CurrentFlatmateOccupation: int
{
    case Student = 1;
    case Professional = 2;

    public function text(): string
    {
        return match($this) {
            self::Student => 'Student', 
            self::Professional => 'Professional', 
        };
    }
}