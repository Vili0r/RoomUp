<?php

it('has web/propertiesviewed page', function () {
    $response = $this->get('/web/propertiesviewed');

    $response->assertStatus(200);
});
