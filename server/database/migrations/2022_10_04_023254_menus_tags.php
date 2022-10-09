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
        Schema::create('menus_tags', function (Blueprint $table) {
            $table->integer('idTag');
            $table->foreign('idTag')->references('idTag')->on('tags')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('idMenu');
            $table->foreign('idMenu')->references('idMenu')->on('menus')->onDelete('cascade')->onUpdate('cascade');
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
