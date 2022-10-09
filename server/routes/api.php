<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\categoryController;
use App\Http\Controllers\commentController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\menuController;
use App\Http\Controllers\noAuthController;
use App\Http\Controllers\tagsController;
use App\Models\comment;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('auth/login', [AuthController::class, 'login']);
Route::post('auth/register', [AuthController::class, 'register']);
Route::post('auth/refresh', [AuthController::class, 'refresh'])->middleware('jwt.verify');
Route::post('auth/logout', [AuthController::class, 'logout'])->middleware('jwt.verify');

Route::get('menu/GetAll', [menuController::class, 'AllMenu']);
Route::get('menu/GetDetail/{id}/{slug}', [menuController::class, 'GetId'])->middleware('jwt.verify');
Route::get('menu/Category/{slug}', [tagsController::class, 'getMenu']);

Route::post('comment/Comment', [commentController::class, 'Comment'])->middleware('jwt.verify');
Route::post('comment/GetComment', [commentController::class, 'getId'])->middleware('jwt.verify');
Route::get('comment/idAll/{id}', [commentController::class, 'getidComment'])->middleware('jwt.verify');

Route::get('category/getAll', [categoryController::class, 'getCategory']);
Route::get('category/position', [categoryController::class, 'position']);

Route::get('tags/Get/{Slug}', [tagsController::class, 'getByTags']);
