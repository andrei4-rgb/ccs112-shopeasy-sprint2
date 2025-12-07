<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CustomerController;

Route::apiResource('orders', OrderController::class);
Route::apiResource('products', ProductController::class);
Route::apiResource('customers', CustomerController::class);

Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});
