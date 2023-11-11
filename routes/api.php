<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Auth\NewPasswordController;
use App\Http\Controllers\Api\Auth\PasswordController;
use App\Http\Controllers\Api\Auth\PasswordResetLinkController;
use App\Http\Controllers\Api\Auth\SocialController;
use App\Http\Controllers\Api\AvailabilityController;
use App\Http\Controllers\Api\Conversation\ConversationController;
use App\Http\Controllers\Api\Conversation\ConversationReplyController;
use App\Http\Controllers\Api\Conversation\ShowConversationController;
use App\Http\Controllers\Api\Message\CreateMessageController;
use App\Http\Controllers\Api\FavouriteController;
use App\Http\Controllers\Api\FlatController;
use App\Http\Controllers\Api\HeaderFilterController;
use App\Http\Controllers\Api\LocationController;
use App\Http\Controllers\Api\Message\MessageController;
use App\Http\Controllers\Api\Message\StoreMessageController;
use App\Http\Controllers\Api\MyPropertiesController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\PropertyViewedController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\RoommateController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\SharedController;
use App\Http\Controllers\Api\SinglePropertyController;
use App\Http\Controllers\Api\TemporaryImageUploadController;
use App\Http\Controllers\Api\ToggleFavouriteController;
use App\Http\Controllers\Api\UpdateProfilePhotoController;
use App\Http\Controllers\Api\FlatDeletePhotoController;
use App\Http\Controllers\Api\RoomDeletePhotoController;
use App\Http\Controllers\Api\RoommateAvailabilityController;
use App\Http\Controllers\Api\RoommateDeletePhotoController;
use App\Http\Controllers\Api\SharedDeletePhotoController;
use App\Http\Controllers\Api\SingleRoommateController;
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
    Route::post('/profile-photo', UpdateProfilePhotoController::class);
    
    //Route to get all favourites' properties
    Route::get('/favourites', FavouriteController::class);

    //Route to get all favourites' properties
    Route::get('/viewed', PropertyViewedController::class);

    //Location controller
    Route::get('/geocode', [LocationController::class, 'geocode']);
    
    //Toggle Favourite Controller
    Route::post('/favourite/{model}/{id}', ToggleFavouriteController::class)
        ->where('model', 'room|flat');

    //My Properties Controller
    Route::get('my-properties', MyPropertiesController::class);

    //Message Controller
    Route::get('/message', MessageController::class);
    Route::get('/message/create', CreateMessageController::class);
    Route::post('/message/store', StoreMessageController::class);

    //Conversation Controller
    Route::get('/conversation', ConversationController::class);
    Route::get('/conversation/{conversation}', ShowConversationController::class);

    //Conversation reply controller
    Route::post('/conversation/{conversation}/reply', ConversationReplyController::class);

    //Api Resource Controller
    Route::apiResource('/flats', FlatController::class)
        ->only(['store', 'edit', 'update', 'destroy']);
    Route::apiResource('/shareds', SharedController::class)
        ->only(['store', 'edit', 'update', 'destroy']);
    Route::apiResource('/rooms', RoomController::class)
        ->only(['edit', 'update', 'destroy']);
    Route::apiResource('/roommates', RoommateController::class)
        ->only(['index', 'store', 'edit', 'update', 'destroy']);
    
    //Temporary image upload
    Route::post('/upload', TemporaryImageUploadController::class);

    //Route to update property availability
    Route::put('/availability/{model}/{id}', AvailabilityController::class)
        ->where('model', 'room|flat');
    Route::put('/availability/roommate/{id}', RoommateAvailabilityController::class);

    //Route to delete photos
    Route::delete('/flat/{flat}/delete-photo', FlatDeletePhotoController::class);
    Route::delete('/shared/{shared}/delete-photo', SharedDeletePhotoController::class);
    Route::delete('/room/{room}/delete-photo', RoomDeletePhotoController::class);
    Route::delete('/roommate/{roommate}/delete-photo', RoommateDeletePhotoController::class);
});
//Auth related routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
Route::post('/reset-password', [NewPasswordController::class, 'store']);

//Social related routes
Route::post('/auth/{provider}/social-login', SocialController::class)
    ->where('provider', 'google|facebook');

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

//Get single roommate
Route::get('/roommates/{roommate}/quest', SingleRoommateController::class);