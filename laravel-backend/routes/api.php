<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CategoryController;

Route::middleware('api')->group(function () {

    Route::get('/', function () {
        return response()->json(['status' => 'ok'], 200);
    });

    Route::apiResource('products', ProductController::class);
    Route::apiResource('customers', CustomerController::class);
    Route::apiResource('orders', OrderController::class);

    // Abad's Categories module
    Route::apiResource('categories', CategoryController::class);

    // Optional: products filtered by category
    Route::get('categories/{category}/products', function (\App\Models\Category $category) {
        return response()->json($category->products()->orderBy('name')->get(), 200);
    });
});
