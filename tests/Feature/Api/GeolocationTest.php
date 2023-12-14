<?php

use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

it('returns expected JSON structure on successful response', function () {
    // Arrange: Mock the external HTTP request
    $fakeResponse = [
        ['label' => 'Athens, Greece', 'lat' => '37.9838', 'lon' => '23.7275'],
        // ... other fake location results
    ];

    Http::fake([
        'api.locationiq.com/v1/autocomplete*' => Http::response($fakeResponse, 200),
    ]);

    // Make the request to your autocomplete endpoint
    $response = $this->getJson('/api/autocomplete?query=Athens'); // This should return a TestResponse

    // Assert the response status
    $response->assertStatus(200);

    // Use the json() method to get the response data
    $responseData = $response->json();

    // Assert the response data
    expect($responseData)->toEqual($fakeResponse);
});

it('returns geocoded results', function () {
    $user = User::factory()->create();
    // Mock XML response from the LocationIQ API
    $mockXmlResponse = <<<XML
        <?xml version="1.0" encoding="UTF-8"?>
        <searchresults>
            <place lat="37.7749" lon="-122.4194" display_name="San Francisco, California, USA" />
        </searchresults>
        XML;

    Http::fake([
        'eu1.locationiq.com/v1/search/structured*' => Http::response($mockXmlResponse, 200),
    ]);

    // Make the request to your geocode endpoint
    $response = actingAs($user)->getJson('/api/geocode', [
        'address_1' => '123 Main St',
        'city' => 'San Francisco',
        'county' => 'San Francisco County',
        'country' => 'USA',
    ]);

    // Assert the response status
    $response->assertStatus(200);

    // Assert the response structure
    $response->assertJson([
        'latitude' => 37.7749,
        'longitude' => -122.4194,
    ]);
});
