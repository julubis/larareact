<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product_units', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('shop_id');
            $table->timestamps();

            $table->foreign('shop_id')->references('id')->on('shops')->onDelete('cascade');
            // $table->unique(['name', 'shop_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_units');
    }
};
