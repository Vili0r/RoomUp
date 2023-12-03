<?php

it('has web/roomwantededit page', function () {
    $response = $this->get('/web/roomwantededit');

    $response->assertStatus(200);
})->skip();
