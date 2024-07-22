<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\DistributorController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductInController;
use App\Http\Controllers\ProductOutController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\Session;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('/products');
})->middleware('auth');

Route::middleware('auth')->group(function () {
    Route::get('products', [ProductController::class, 'index'])->name('products.get');
    Route::post('products', [ProductController::class, 'store'])->name('products.add');
    Route::put('products/{id}', [ProductController::class, 'update'])->name('products.edit');
    Route::delete('products/{id}', [ProductController::class, 'destroy'])->name('products.delete');

    Route::get('products/new', [ProductController::class, 'create'])->name('products.create');
    Route::get('products/detail/{id}', [ProductController::class, 'show'])->name('products.detail');

    Route::post('products/barcode', [ProductController::class, 'barcode'])->name('products.barcode');

    Route::get('distributors', [DistributorController::class, 'index'])->name('distributors.get');
    Route::post('distributors', [DistributorController::class, 'store'])->name('distributors.add');
    Route::put('distributors/{id}', [DistributorController::class, 'update'])->name('distributors.edit');
    Route::delete('distributors/{id}', [DistributorController::class, 'destroy'])->name('distributors.delete');

    Route::get('distributors/new', [DistributorController::class, 'create'])->name('distributors.create');
    Route::get('distributors/detail/{id}', [DistributorController::class, 'show'])->name('distributors.detail');

    Route::get('product-in', [ProductInController::class, 'index'])->name('product-in.get');
    Route::post('product-in', [ProductInController::class, 'store'])->name('product-in.add');
    Route::delete('product-in/{id}', [ProductInController::class, 'destroy'])->name('product-in.delete');

    Route::get('product-in/new', [ProductInController::class, 'create'])->name('product-in.create');
    Route::get('product-in/detail/{id}', [ProductInController::class, 'show'])->name('product-in.detail');

    Route::get('product-out', [ProductOutController::class, 'index'])->name('product-out.get');
    Route::post('product-out', [ProductOutController::class, 'store'])->name('product-out.add');
    Route::delete('product-out/{id}', [ProductOutController::class, 'destroy'])->name('product-out.delete');

    Route::get('product-out/new', [ProductOutController::class, 'create'])->name('product-out.create');
    Route::get('product-out/detail/{id}', [ProductOutController::class, 'show'])->name('product-out.detail');

    Route::get('account', [AccountController::class, 'index'])->name('account.get');
    Route::put('update-profile', [AccountController::class, 'update_profile'])->name('account.update-profile');  
    Route::put('update-password', [AccountController::class, 'update_password'])->name('account.update-password'); 
    
    Route::post('logout', [Session::class, 'destroy'])->name('logout');
    
});

Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'create'])->name('login');
    Route::post('/login', [LoginController::class, 'store'])->name('login.add');
    Route::get('/register', [RegisterController::class, 'create'])->name('register');
    Route::post('/register', [RegisterController::class, 'store'])->name('register.add');
});