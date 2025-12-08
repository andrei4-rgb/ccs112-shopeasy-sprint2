<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        \App\Models\Category::updateOrCreate(
            ['name' => 'Electronics'],
            ['description' => 'Devices and gadgets']
        );

        \App\Models\Category::updateOrCreate(
            ['name' => 'Books'],
            ['description' => 'Paper and e-books']
        );

        \App\Models\Category::updateOrCreate(
            ['name' => 'Accessories'],
            ['description' => 'Add-ons and extras']
        );
    }
}
