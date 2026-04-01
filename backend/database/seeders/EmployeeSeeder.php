<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Employee;
Use App\Models\User;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        $employees = User::where('role', 'employee')->get();

        foreach ($employees as $user) {
            Employee::create([
                'user_id' => $user->id,
                'phone' => '0600000000',
                'specialty' => 'Coupe & Barbe',
                'is_active' => true,
            ]);
        }
    }
}
