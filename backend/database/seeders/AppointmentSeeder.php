<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Appointment;
use App\Models\Client;
use App\Models\Employee;
use App\Models\SalonService;

class AppointmentSeeder extends Seeder
{
    public function run(): void
    {
        $clients = Client::all();
        $employees = Employee::all();
        $services = SalonService::all();

        foreach ($clients as $client) {
            Appointment::create([
                'client_id' => $client->id,
                'employee_id' => $employees->random()->id,
                'salon_service_id' => $services->random()->id,
                'appointment_date' => now()->addDays(rand(0, 10)),
                'appointment_time' => '10:00:00',
                'status' => 'confirmed',
                'notes' => null,
            ]);
        }
    }
}
