<?php

it('has api/roommateindex page', function () {
    $response = $this->get('/api/roommateindex');

    $response->assertStatus(200);
});
