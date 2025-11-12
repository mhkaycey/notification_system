<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestPublishController;
use App\Http\Controllers\HealthController;
use App\Http\Controllers\StatusController;

Route::post('/v1/test/publish', [TestPublishController::class, 'publish']);
Route::get('/health', [HealthController::class, 'index']);
Route::get('/status/{msgId}', [StatusController::class, 'show']);