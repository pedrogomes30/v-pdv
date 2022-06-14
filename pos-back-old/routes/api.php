<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\v1\AuthController;
use App\Http\Controllers\API\v1\StoreController;
use App\Http\Middleware\API\v1\ProtectedRouteAuth;

Route::prefix('v1')->group(function(){
    Route::post('login',                [AuthController::class,'login']);
        Route::middleware([ProtectedRouteAuth::class])->group(function(){
            //auth
            Route::post('/logout',           [AuthController::class,'logout']);
            Route::post('/refresh',          [AuthController::class,'refresh']);
            Route::post('/me',               [AuthController::class,'me']);
            Route::get('/me/store',          [AuthController::class,'meStore']);
            
            //store
            Route::get('/stores',           [StoreController::class,'index']);
            Route::get('/stores/id',        [StoreController::class,'show']);
            Route::post('/store',           [StoreController::class,'store']);
            Route::post('/store/id',        [StoreController::class,'update']);
            Route::post('/store',           [StoreController::class,'delete']);

            //StoreGroup
            Route::get('/storeGroup',       [StoreGroupController::class,'index']);
            Route::get('/storeGroup/id',    [StoreGroupController::class,'show']);
            Route::post('/storeGroup',      [StoreGroupController::class,'store']);
            Route::post('/storeGroup/id',   [StoreGroupController::class,'update']);
            Route::post('/storeGroup',      [StoreGroupController::class,'delete']);

            //example
            // Route::get('/tracks',         [TrackController::class,'index']);
            // Route::get('/tracks/{id}',    [TrackController::class,'show']);
            // Route::post('/tracks',        [TrackController::class,'store']);
            // Route::post('/tracks/{id}',   [TrackController::class,'update']);
            // Route::delete('/tracks/{id}', [TrackController::class,'delete']);
            
        });
});