<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 255)->nullable()->default(null);
            $table->string('type', 255)->nullable()->default(null);
            $table->string('brand', 255)->nullable()->default(null);
            $table->double('price', 100,2)->nullable()->default(null);
            $table->string('img', 255)->nullable()->default(null);
            $table->string('imgDetail', 255)->nullable()->default(null);
            $table->integer('qty')->nullable()->default(null);
            $table->string('user', 255)->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
