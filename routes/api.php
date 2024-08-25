<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserProfileController;
use Illuminate\Support\Facades\Route;

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function () {
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/register', [AuthController::class, 'register'])->name('register');

    Route::middleware('auth:api')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api')->name('logout');
        Route::post('/refresh', [AuthController::class, 'refresh'])->middleware('auth:api')->name('refresh');
        Route::post('/me', [AuthController::class, 'me'])->middleware('auth:api')->name('me');
    });
});

Route::middleware('auth:api')->prefix('profile')->group(function () {
    Route::get('/', [UserProfileController::class, 'show'])->name('profile.show');
    Route::put('/', [UserProfileController::class, 'update'])->name('profile.update');
    Route::delete('/', [UserProfileController::class, 'destroy'])->name('profile.destroy');
});
