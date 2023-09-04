<?php

use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\SinglePropertyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/home-search', SearchController::class);

Route::get('/property/{model}/{id}', SinglePropertyController::class)
    ->where('model', 'room|flat');