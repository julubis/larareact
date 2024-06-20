<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegisterController;
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
    Route::get('products', [ProductController::class, 'index']);
    Route::get('distributors', function () {
        return Inertia::render('Distributor', [
            'filters' => Request::all('col', 'sort'), 
        ]);
    });
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

// Route::resource('/posts', \App\Http\Controllers\PostController::class);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Route::get()
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'create'])->name('login');
    Route::post('/login', [LoginController::class, 'store'])->name('login');
    Route::get('/register', [RegisterController::class, 'create'])->name('register');
    Route::post('/register', [RegisterController::class, 'store'])->name('register');
});

require __DIR__.'/auth.php';
