<?php

use Illuminate\Http\JsonResponse;

Route::get('/', function (): JsonResponse {
    return response()->json([
        'message' => 'Welcome to Shopeasy API',
        'status' => 'OK',
        'version' => '1.0.0'
    ]);
});
