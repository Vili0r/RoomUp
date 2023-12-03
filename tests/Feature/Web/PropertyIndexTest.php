<?php

it('has web/propertyindex page', function () {
    $response = $this->get('/web/propertyindex');

    $response->assertStatus(200);
})->skip();
