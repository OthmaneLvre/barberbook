<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{

    public function run(): void
    {
        // Admin
        User::create([
            'name' => 'Admin BarberBook',
            'email' => 'admin@barberbook.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Employés
        User::create([
            'name' => 'Mike Fade',
            'email' => 'mike@barberbook.com',
            'password' => Hash::make('password'),
            'role' => 'employee',
        ]);
    }
}
