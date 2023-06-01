<?php

namespace App\Enums;

enum Mode: int
{
    case Walk = 1; 
    case By_car = 2;
    case By_bus = 3;
    case By_bike = 4;

    public function text(): string
    {
        return match($this) {
            self::Walk  => 'walk', 
            self::By_car => 'by car', 
            self::By_bus => 'by bus', 
            self::By_bike => 'by bike',
        };
    }
}