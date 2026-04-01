<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Client;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 10; $i++) {
            Client::create([
                'first_name' => "Client$i",
                'last_name' => "Test$i",
                'email' => "client$i@test.com",
                'phone' => '0600000000',
                'notes' => null,
            ]);
        }
    }
}
