<?php

use App\Http\Controllers\DistributorController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\Session;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/masuk', function () {
//     return Inertia::render('Login');
// });

Route::get('/home', function () {
    return Inertia::render('Home');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('home', function () {
        return Inertia::render('Home');
    });
    Route::get('products', [ProductController::class, 'index'])->name('products.get');
    Route::post('products', [ProductController::class, 'store'])->name('products.add');
    Route::get('products/new', [ProductController::class, 'create'])->name('products.create');
    Route::get('products/detail/{id}', [ProductController::class, 'show'])->name('products.detail');

    Route::get('distributors', [DistributorController::class, 'index'])->name('distributors.get');
    Route::post('distributors', [DistributorController::class, 'store'])->name('distributors.add');
    Route::delete('distributors/{id}', [DistributorController::class, 'destroy'])->name('distributors.delete');

    Route::get('distributors/new', [DistributorController::class, 'create'])->name('distributors.create');
    Route::get('distributors/detail/{id}', [DistributorController::class, 'show'])->name('distributors.detail');

    Route::get('product-incoming', function () {
        return Inertia::render('ProductIn', [
            'filters' => Request::all('col', 'sort'), 
        ]);
    });
    Route::get('product-outgoing', function () {
        return Inertia::render('ProductOut', [
            'filters' => Request::all('col', 'sort'), 
        ]);
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Route::get()
    Route::post('logout', [Session::class, 'destroy'])->name('logout');
});

Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'create'])->name('login');
    Route::post('/login', [LoginController::class, 'store'])->name('login');
    Route::get('/register', [RegisterController::class, 'create'])->name('register');
    Route::post('/register', [RegisterController::class, 'store'])->name('register');
});