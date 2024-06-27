<?php

use App\Http\Controllers\DistributorController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductInController;
use App\Http\Controllers\ProductOutController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\Session;
use Illuminate\Foundation\Application;
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

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('Home');
    });
    Route::get('products', [ProductController::class, 'index'])->name('products.get');
    Route::post('products', [ProductController::class, 'store'])->name('products.add');
    Route::put('products/{id}', [ProductController::class, 'update'])->name('products.edit');
    Route::delete('products/{id}', [ProductController::class, 'destroy'])->name('products.delete');

    Route::get('products/new', [ProductController::class, 'create'])->name('products.create');
    Route::get('products/detail/{id}', [ProductController::class, 'show'])->name('products.detail');

    Route::get('distributors', [DistributorController::class, 'index'])->name('distributors.get');
    Route::post('distributors', [DistributorController::class, 'store'])->name('distributors.add');
    Route::put('distributors/{id}', [DistributorController::class, 'update'])->name('distributors.edit');
    Route::delete('distributors/{id}', [DistributorController::class, 'destroy'])->name('distributors.delete');

    Route::get('distributors/new', [DistributorController::class, 'create'])->name('distributors.create');
    Route::get('distributors/detail/{id}', [DistributorController::class, 'show'])->name('distributors.detail');

    Route::get('product-in', [ProductInController::class, 'index'])->name('product-in.get');
    Route::post('product-in', [ProductInController::class, 'store'])->name('product-in.add');
    Route::put('product-in/{id}', [ProductInController::class, 'update'])->name('product-in.edit');
    Route::delete('product-in/{id}', [ProductInController::class, 'destroy'])->name('product-in.delete');

    Route::get('product-in/new', [ProductInController::class, 'create'])->name('product-in.create');
    Route::get('product-in/detail/{id}', [ProductInController::class, 'show'])->name('product-in.detail');

    Route::get('product-out', [ProductOutController::class, 'index'])->name('product-out.get');
    Route::post('product-out', [ProductOutController::class, 'store'])->name('product-out.add');
    Route::put('product-out/{id}', [ProductOutController::class, 'update'])->name('product-out.edit');
    Route::delete('product-out/{id}', [ProductOutController::class, 'destroy'])->name('product-out.delete');

    Route::get('product-out/new', [ProductOutController::class, 'create'])->name('product-out.create');
    Route::get('product-out/detail/{id}', [ProductOutController::class, 'show'])->name('product-out.detail');

    Route::get('account', [ProductOutController::class, 'index'])->name('account.get');
    Route::put('account', [DistributorController::class, 'update'])->name('account.edit');   
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
    Route::post('/login', [LoginController::class, 'store'])->name('login.add');
    Route::get('/register', [RegisterController::class, 'create'])->name('register');
    Route::post('/register', [RegisterController::class, 'store'])->name('register.add');
});