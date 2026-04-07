<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Employee;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function stats()
    {
        $today = Carbon::today();

        $appointmentsToday = Appointment::whereDate('appointment_date', $today)->count();

        $appointmentsConfirmed = Appointment::whereDate('appointment_date', $today)
            ->where('status', 'confirmed')
            ->count();

        $appointmentsPending = Appointment::whereDate('appointment_date', $today)
            ->where('status', 'pending')
            ->count();

        $employeesActive = Employee::where('is_active', true)->count();

        $nextAppointments = Appointment::with(['client', 'employee.user'])
            ->whereDate('appointment_date', '>=', $today)
            ->orderBy('appointment_date')
            ->orderBy('appointment_time')
            ->limit(5)
            ->get();

        return response()->json([
            'appointments_today' => $appointmentsToday,
            'appointments_confirmed' => $appointmentsConfirmed,
            'appointments_pending' => $appointmentsPending,
            'employees_active' => $employeesActive,
            'next_appointments' => $nextAppointments,
        ]);
    }
}
