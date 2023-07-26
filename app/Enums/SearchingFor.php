<?php

namespace App\Enums;

enum SearchingFor: int
{
    case Me = 1; 
    case Me_and_my_partner = 2; 
    case Me_and_a_friend = 3;

    public function text(): string
    {
        return match($this) {
            self::Me  => 'Me', 
            self::Me_and_my_partner  => 'Me and my partner', 
            self::Me_and_a_friend => 'Me and a friend', 
        };
    }
}