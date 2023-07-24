<?php

namespace App\Enums;

enum Stations: int
{
    case Sintagma = 1; 
    case Monastiraki = 2;
    case Evagelismos = 3;
    case Attiki = 4;
    case Cholargos = 5;
    case Omonoia = 6;
    case Akropoli = 7;
    case Pireas = 8;
    case Mosxato = 9;
    case Kalithea = 10;

    public function text(): string
    {
        return match($this) {
            self::Sintagma  => 'Sintagma', 
            self::Monastiraki => 'Monastiraki', 
            self::Evagelismos => 'Evagelismos', 
            self::Attiki => 'Attiki', 
            self::Cholargos => 'Cholargos',
            self::Omonoia => 'Omonoia',
            self::Akropoli => 'Akropoli', 
            self::Pireas => 'Pireas',
            self::Mosxato => 'Mosxato',
            self::Kalithea => 'Kalithea',
        };
    }
}