<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\SalonServiceController;
use App\Http\Controllers\Api\EmployeeController;
use App\Http\Controllers\Api\AppointmentController;
use App\Http\Controllers\Api\AvailabilityController;
use App\Http\Controllers\Api\DashboardController;


/*
| -----------------------------------------------------
| Public Routes
| -----------------------------------------------------
*/

Route::get('/test', function () {
    return response()->json([
        'message' => 'API BarberBook opérationnelle'
    ]);
});

Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Protected routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

    Route::apiResource('appointments', AppointmentController::class);
    Route::apiResource('clients', ClientController::class);
    Route::apiResource('salon-services', SalonServiceController::class);
    Route::apiResource('employees', EmployeeController::class);
    Route::apiResource('availabilities', AvailabilityController::class);
});
