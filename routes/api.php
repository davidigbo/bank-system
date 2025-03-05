<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/deposit', [BankController::class, 'deposit']);
    Route::post('/withdraw', [BankController::class, 'withdraw']);
    Route::post('/transfer', [BankController::class, 'transfer']);
    Route::get('/transactions', [BankController::class, 'transactions']);
});
