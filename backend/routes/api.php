<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\SalonServiceController;
use App\Http\Controllers\Api\EmployeeController;
use App\Http\Controllers\Api\AppointmentController;
use App\Http\Controllers\Api\AvailabilityController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\AvailabilitySlotController;


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

    Route::get('/dashboard/stats', [DashboardController::class, 'stats'])->middleware('admin');

    Route::apiResource('appointments', AppointmentController::class);
    Route::apiResource('clients', ClientController::class);
    Route::apiResource('salon-services', SalonServiceController::class);
    Route::apiResource('employees', EmployeeController::class);

    Route::get('/availabilities', [AvailabilityController::class, 'index']);
    Route::get('/availabilities/{availability}', [AvailabilityController::class, 'show']);

    Route::middleware('admin')->group(function () {
        Route::post('/availabilities', [AvailabilityController::class, 'store']);
        Route::put('/availabilities/{availability}', [AvailabilityController::class, 'update']);
        Route::delete('/availabilities/{availability}', [AvailabilityController::class, 'destroy']);
    });
    
    Route::get('/availability-slots', [AvailabilitySlotController::class, 'index']);
});
