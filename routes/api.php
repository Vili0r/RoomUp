<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\FavouriteController;
use App\Http\Controllers\Api\PropertyViewedController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\SinglePropertyController;
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

Route::group(['middleware' => ['auth:sanctum']], function() {
    //Logout
    Route::post('/logout', [AuthController::class, 'logout']);
    
    //Route to get all favourites' properties
    Route::get('/users/{user}/favourites', FavouriteController::class);

    //Route to get all favourites' properties
    Route::get('/users/{user}/viewed', PropertyViewedController::class);
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/home-search', SearchController::class);

Route::get('/property/{model}/{id}', SinglePropertyController::class)
    ->where('model', 'room|flat');