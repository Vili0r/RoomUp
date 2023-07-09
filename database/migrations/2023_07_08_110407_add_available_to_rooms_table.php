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
        Schema::table('rooms', function (Blueprint $table) {
            $table->string('sub_title')->nullable()->after('id');
            $table->text('sub_description')->nullable()->after('sub_title');
            $table->boolean('available')->nullable()->default(0)->after('short_term');
            $table->date('live_at')->nullable()->after('available');
            $table->text('images')->nullable()->after('live_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('rooms', function (Blueprint $table) {
            //
        });
    }
};
