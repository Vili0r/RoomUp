<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CommentController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RevokeController;
use App\Http\Controllers\Admin\RevokeUserPermissionController;
use App\Http\Controllers\Admin\RevokeUserRoleController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\SocialController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FlatAvailabilityController;
use App\Http\Controllers\FlatController;
use App\Http\Controllers\FlatDeletePhotoContoller;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ModalSearchContoller;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SharedAvailabilityController;
use App\Http\Controllers\SharedController;
use App\Http\Controllers\SharedDeletePhotoController;
use App\Http\Controllers\TemporaryImageDeleteController;
use App\Http\Controllers\TemporaryImageUploadController;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Home Page
Route::get('/', [HomeController::class, 'welcome'])
    ->name('welcome'); 
Route::get('/blog', [HomeController::class, 'blog'])
    ->name('blog');
Route::get('/about-us', [HomeController::class, 'aboutUs'])
    ->name('about-us');
Route::get('/search', SearchController::class)
    ->name('search');
  
//Socials routes
Route::get('/auth/{provider}/redirect', [SocialController::class, 'redirect'])
    ->where('provider', 'google|facebook');
Route::get('/auth/{provider}/callback', [SocialController::class, 'callback'])
    ->where('provider', 'google|facebook');

Route::group(['middleware' => ['auth', 'verified']], function() {

    //Dashboard controller
    Route::get('/dashboard', DashboardController::class)
        ->name('dashboard');

    //Profile controller
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');

    //Route to change availability on shared property
    Route::put('/shared/{shared}/availability', SharedAvailabilityController::class)
        ->name('shared.availability');
    
    //Route to change availability on flat property
    Route::put('/flat/{flat}/availability', FlatAvailabilityController::class)
        ->name('flat.availability');
    
    //Route to delete photos
    Route::delete('/shared/{shared}/delete-photo', SharedDeletePhotoController::class)
    ->name('shared.deletePhotos.destroy');
    Route::delete('/flat/{flat}/delete-photo', FlatDeletePhotoContoller::class)
    ->name('flat.deletePhotos.destroy');

    //Temporary image upload - FilePond
    Route::post('/upload', TemporaryImageUploadController::class);
    //Temporary image delete - FilePond
    Route::delete('/revert/{folder}', TemporaryImageDeleteController::class)
    ->name('revert.image');

    //Resource controller
    Route::resource('/flat', FlatController::class);
    Route::resource('/shared', SharedController::class);
    //Route::get('my-properties/shared', MyPropertiesController::class)->name('my-properties.shared');

    //Admin
    Route::group(['middleware' => ['role:admin|writer|moderator'], 'prefix' => 'admin', 'as' => 'admin.'], function () {
        //Admin dashboard controller
        Route::get('/', AdminController::class)->name('index');

        //Blog controller
        Route::resource('blogs', BlogController::class);
        Route::resource('categories', CategoryController::class);
        Route::resource('comments', CommentController::class);

        //User & Permissions & Roles
        Route::middleware(['role:admin'])->group(function () {
            //Revoke permissions for roles
            Route::delete('/roles/{role}/permissions/{permission}', RevokeController::class)->name('roles.permissions.destroy');
            
            //Revoke permissions for users
            Route::delete('/users/{user}/permissions/{permission}', RevokeUserPermissionController::class)->name('users.permissions.destroy');
            //Revoke roles for users
            Route::delete('/users/{user}/roles/{role}', RevokeUserRoleController::class)->name('users.roles.destroy');

            //Admin Resource controllers
            Route::resource('/blogs', BlogController::class);
            Route::resource('/categories', CategoryController::class);
            Route::resource('/users', UserController::class)->except(['show']);
            Route::resource('/roles', RoleController::class)->except(['create', 'show']);
            Route::resource('/permissions', PermissionController::class)->except(['create', 'show']);

        });
    });
});

require __DIR__.'/auth.php';
