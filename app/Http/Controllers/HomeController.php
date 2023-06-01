<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Route;

class HomeController extends Controller
{
    public function welcome(): Response
    {
        return Inertia::render('Home/Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }
    
    public function placeAd(): Response
    {
        return Inertia::render('Home/PlaceAd');
    }
    
    public function blog(): Response
    {
        return Inertia::render('Home/Blog');
    }
    
    public function aboutUs(): Response
    {
        return Inertia::render('Home/AboutUs');
    }
}
