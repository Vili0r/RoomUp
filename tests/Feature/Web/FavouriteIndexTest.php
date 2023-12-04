<?php

it('has web/favouriteindex page', function () {
    $response = $this->get('/web/favouriteindex');

    $response->assertStatus(200);
});
