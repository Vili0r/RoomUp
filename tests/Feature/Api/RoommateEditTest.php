<?php

it('has api/roommateedit page', function () {
    $response = $this->get('/api/roommateedit');

    $response->assertStatus(200);
});
