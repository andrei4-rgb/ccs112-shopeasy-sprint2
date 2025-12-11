<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Welcome route for quick check
Route::get('/', function () {
    return response()->json([
        'message' => 'Welcome to Shopeasy API',
        'status' => 'OK',
        'version' => '1.0.0'
    ]);
});

// 🔥 Authenticated user route
Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});
