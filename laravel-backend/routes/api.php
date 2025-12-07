<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CustomerController;

// Austria's Orders API
Route::apiResource('orders', OrderController::class);

// Barbo's Products API
Route::apiResource('products', ProductController::class);

// Azurine's Customers API
Route::apiResource('customers', CustomerController::class);
