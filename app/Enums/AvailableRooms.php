<?php

namespace App\Enums;

enum AvailableRooms: int
{
    case One_Room_For_Rent = 1; 
    case Two_Room_For_Rent = 2; 
    case Three_Room_For_Rent = 3;
    case Four_Room_For_Rent = 4;
    case Five_Room_For_Rent = 5;
    case Six_Room_For_Rent = 6;
    case Seven_Room_For_Rent = 7;
    case Eight_Room_For_Rent = 8;
    case Nine_Room_For_Rent = 9;
    case Ten_Room_For_Rent = 10;

    public function text(): string
    {
        return match($this) {
            self::One_Room_For_Rent  => '1 Room for rent', 
            self::Two_Room_For_Rent  => '2 Room for rent', 
            self::Three_Room_For_Rent => '3 Room for rent', 
            self::Four_Room_For_Rent => '4 Room for rent', 
            self::Five_Room_For_Rent => '5 Room for rent', 
            self::Six_Room_For_Rent => '6 Room for rent', 
            self::Seven_Room_For_Rent => '7 Room for rent', 
            self::Eight_Room_For_Rent => '8 Room for rent', 
            self::Nine_Room_For_Rent => '9 Room for rent', 
            self::Ten_Room_For_Rent => '10 Room for rent', 
        };
    }
}