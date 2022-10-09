<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menus', function (Blueprint $table) {
            $table->integer('idMenu')->primary();
            $table->integer('idCategory');
            $table->foreign('idCategory')->references('idCategory')->on('categorys')->onDelete('cascade')->onUpdate('cascade');
            $table->string('name', 150);
            $table->text('description');
            $table->decimal('price', 5,2);
            $table->integer('ratingcount');
            $table->integer('ratingsum');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
