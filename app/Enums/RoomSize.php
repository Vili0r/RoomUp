<?php

namespace App\Enums;

enum RoomSize: int
{
    case Single = 1; 
    case Double = 2;

    public function text(): string
    {
        return match($this) {
            self::Single  => 'single', 
            self::Double => 'double', 
        };
    }
}