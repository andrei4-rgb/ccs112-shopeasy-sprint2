<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return response()->json(['status' => 'ok'], 200);
});

// Public routes
Route::apiResource('products', ProductController::class)->only(['index', 'show']);
Route::apiResource('customers', CustomerController::class)->only(['index', 'show']);
Route::apiResource('orders', OrderController::class)->only(['index', 'show']);

// Abad's Categories module (public view)
Route::apiResource('categories', CategoryController::class)->only(['index', 'show']);

// Optional: products filtered by category
Route::get('categories/{category}/products', function (\App\Models\Category $category) {
    return response()->json($category->products()->orderBy('name')->get(), 200);
});

// Authentication routes
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Admin-only routes
    Route::middleware(\App\Http\Middleware\AdminMiddleware::class)->group(function () {
        Route::apiResource('products', ProductController::class)->except(['index', 'show']);
        Route::apiResource('customers', CustomerController::class)->except(['index', 'show']);
        Route::apiResource('orders', OrderController::class)->except(['index', 'show']);
        Route::apiResource('categories', CategoryController::class)->except(['index', 'show']);
    });
});
