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
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_identifier'); // Foreign key for order
            $table->string('item_name'); // Required field for item name
            $table->unsignedBigInteger('product_id'); // Required field for product ID
            $table->decimal('product_price', 10, 2); // Required field for product price
            $table->integer('quantity'); // Required field for quantity
            $table->timestamps();
            $table->foreign('order_identifier')->references('id')->on('orders')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
