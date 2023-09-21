<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class LocationController extends Controller
{
    public function geocode(Request $request)
    {
        $apiKey = config('services.location.access_token');
        $limit = 10;

        $response = Http::withHeaders([
            'accept' => 'application/xml', // Specify that you expect an XML response
        ])->get('https://eu1.locationiq.com/v1/search/structured', [
            'street' => $request->input('address_1'),
            'city' => $request->input('city'),
            'county' => $request->input('county'),
            'country' => $request->input('country'),
            'limit' => $limit,
            'key' => $apiKey, // Replace with your actual API key
        ]);
    
        // Check for a successful response (status code 200)
        if ($response->status() === 200) {
            $xmlString = $response->body(); // Get the XML response as a string
            $xml = simplexml_load_string($xmlString); // Parse the XML string
    
            // Extract data from the parsed XML
            $place = $xml->place;
    
            // Accessing attributes and data within the <place> element
            $lat = (float)$place->attributes()->lat;
            $lon = (float)$place->attributes()->lon;
            $displayName = (string)$place->attributes()->display_name;
    
            // Log the extracted data (you can handle it as needed)
            return response()->json([
                'latitude' => $lat,
                'longitude' => $lon,
                'displayName' => $displayName,
            ], 200);

        } else {
            // Handle the error here, if needed
            return null;
        }
    }
    
    public function autocomplete(Request $request)
    {
        $apiKey = config('services.location.access_token');
        $limit = 10;

        $response = Http::withHeaders([
            'accept' => 'application/json', // Specify that you expect an XML response
        ])->get('https://api.locationiq.com/v1/autocomplete', [
            'q' => $request->input('query'),
            'limit' => $limit,
            'key' => $apiKey, // Replace with your actual API key
        ]);
    
        // Check for a successful response (status code 200)
        if ($response->status() === 200) {
            $body = $response->getBody();
            $data = json_decode($body, true);

            return response()->json($data); 
        } else {
            // Handle the error here, if needed
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
}
