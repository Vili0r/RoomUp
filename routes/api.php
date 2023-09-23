<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Auth\NewPasswordController;
use App\Http\Controllers\Api\Auth\PasswordController;
use App\Http\Controllers\Api\Auth\PasswordResetLinkController;
use App\Http\Controllers\Api\FavouriteController;
use App\Http\Controllers\Api\HeaderFilterController;
use App\Http\Controllers\Api\LocationController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\PropertyViewedController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\SinglePropertyController;
use App\Http\Controllers\Api\ToggleFavouriteController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Request;


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
    Route::put('/password', [PasswordController::class, 'update']);

    //Profile controller
    Route::get('/profile', [ProfileController::class, 'edit']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::delete('/profile', [ProfileController::class, 'destroy']);
    
    //Route to get all favourites' properties
    Route::get('/favourites', FavouriteController::class);

    //Route to get all favourites' properties
    Route::get('/viewed', PropertyViewedController::class);

    //Location controller
    Route::get('/geocode', [LocationController::class, 'geocode']);
    
    //Toggle Favourite Controller
    Route::post('/favourite/{model}/{id}', ToggleFavouriteController::class)
    ->where('model', 'room|flat');
});
//Auth related routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
Route::post('/reset-password', [NewPasswordController::class, 'store']);

//Route for both authenticated and non-authenticated user 
//as fetching data based on the request->user()
$middleware = ['api'];
if (Request::header('Authorization')) 
   $middleware = array_merge(['auth:sanctum']);
Route::group(['middleware' => $middleware], function () {
    //Home search controller for SearchScreen
    Route::get('home-search', SearchController::class);
    //Header filter controller
    Route::get('/header-filter', HeaderFilterController::class);
    // Autocomplete controller
    Route::get('/autocomplete', [LocationController::class, 'autocomplete']);
});

//Single Property Detail Controller
Route::get('/property/{model}/{id}', SinglePropertyController::class)
    ->where('model', 'room|flat');