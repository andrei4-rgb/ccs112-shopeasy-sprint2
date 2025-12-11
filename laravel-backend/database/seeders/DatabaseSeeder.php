<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ✅ Seed the default admin user
        $this->call(AdminUserSeeder::class);

        // ✅ Seed all products from ProductSeeder
        $this->call(ProductSeeder::class);

        // ✅ seed the default user
        $this->call(UserSeeder::class);

    }
}
