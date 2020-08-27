<?php

use Illuminate\Support\Facades\Route;

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

Route::get('product', 'ProductController@index');
Route::post('product', 'ProductController@create');
Route::patch('product', 'ProductController@update');
Route::delete('product/{id}', 'ProductController@delete');
Route::get('product/search', 'ProductController@search');
Route::get('product/searchParams', 'ProductController@searchParams');
Route::get('product/{id}', 'ProductController@show');
