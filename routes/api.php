<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Auth\NewPasswordController;
use App\Http\Controllers\Api\Auth\PasswordController;
use App\Http\Controllers\Api\Auth\PasswordResetLinkController;
use App\Http\Controllers\Api\FavouriteController;
use App\Http\Controllers\Api\ProfileController;
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

    //Update Password Controller
    Route::put('/users/{user}/password', [PasswordController::class, 'update']);

    //Profile controller
    Route::get('/users/{user}/profile', [ProfileController::class, 'edit']);
    Route::put('/users/{user}/profile', [ProfileController::class, 'update']);
    Route::delete('/users/{user}/profile', [ProfileController::class, 'destroy']);
    
    //Route to get all favourites' properties
    Route::get('/users/{user}/favourites', FavouriteController::class);

    //Route to get all favourites' properties
    Route::get('/users/{user}/viewed', PropertyViewedController::class);
});
//Auth related routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
Route::post('/reset-password', [NewPasswordController::class, 'store']);

Route::get('/home-search', SearchController::class);

Route::get('/property/{model}/{id}', SinglePropertyController::class)
    ->where('model', 'room|flat');