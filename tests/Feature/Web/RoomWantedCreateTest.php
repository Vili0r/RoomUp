<?php

it('has web/roomwantedcreate page', function () {
    $response = $this->get('/web/roomwantedcreate');

    $response->assertStatus(200);
})->skip();
