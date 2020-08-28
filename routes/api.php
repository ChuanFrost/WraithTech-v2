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
Route::post('product/type', 'ProductController@addType');
Route::post('product/brand', 'ProductController@addBrand');
Route::get('product/search', 'ProductController@search');
Route::get('product/searchParams', 'ProductController@searchParams');
Route::get('product/{id}', 'ProductController@show');
Route::delete('product/{id}', 'ProductController@delete');
Route::delete('product/type/{id}', 'ProductController@deleteType');
Route::delete('product/brand/{id}', 'ProductController@deleteBrand');
