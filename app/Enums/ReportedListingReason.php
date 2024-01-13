<?php

namespace App\Enums;

enum ReportedListingReason: int
{
    case Property_information_is_incorrect  = 1; 
    case Property_price_is_incorrect  = 2; 
    case Property_address_is_incorrect  = 3; 
    case Property_is_no_longer_available = 4;
    case Advertiser_is_not_contactable = 5;
    case Problem_with_photos_or_video = 6;
    case Inappropriate_Content = 7; 
    case Duplicate_Listing = 8;
    case Safety_Concern = 9;
    case Scam = 10;
    case Other = 11;
    
    public function text(): string
    {
        return match($this) {
            self::Property_information_is_incorrect => 'Property information is incorrect', 
            self::Property_price_is_incorrect => 'Property price is incorrect', 
            self::Property_address_is_incorrect => 'Property address is incorrect', 
            self::Property_is_no_longer_available => 'Property is no longer available', 
            self::Advertiser_is_not_contactable => 'Advertiser is not contactable', 
            self::Problem_with_photos_or_video => 'Problem with photos or video', 
            self::Inappropriate_Content  => 'Inappropriate Content', 
            self::Duplicate_Listing => 'Duplicate Listing', 
            self::Safety_Concern => 'Safety Concern', 
            self::Scam => 'Scam', 
            self::Other => 'Other', 
        };
    }
}