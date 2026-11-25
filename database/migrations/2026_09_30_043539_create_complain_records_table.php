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
        Schema::create('complain_records', function (Blueprint $table) {
            $table->id();
            $table->string('client_name');
            $table->string('address');
            $table->string('primary_contact_person')->nullable();
            $table->string('phone_number');
            $table->string('service_type');
            $table->string('image')->nullable();
            $table->string('technician_name')->nullable();
            $table->longText('note')->nullable();
            $table->date('complain_date')->nullable();
            $table->date('fixed_date')->nullable();
            $table->string('work_status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('complain_records');
    }
};
