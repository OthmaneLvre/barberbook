<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SalonService;

class SalonServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            ['name' => 'Coupe classique', 'duration' => 30, 'price' => 20],
            ['name' => 'Dédradé', 'duration' => 45, 'price' => 25],
            ['name' => 'Barbe', 'duration' => 20, 'price' => 15],
            ['name' => 'Coupe + Barbe', 'duration' => 60, 'price' => 35],
            ['name' => 'Soin premium', 'duration' => 50, 'price' => 40],
        ];

        foreach ($services as $service) {
            SalonService::create([
                ...$service,
                'description' => null,
                'is_active' => true,
            ]);
        }
    }
}
