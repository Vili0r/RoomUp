<?php

it('has api/roommatecreate page', function () {
    $response = $this->get('/api/roommatecreate');

    $response->assertStatus(200);
});
