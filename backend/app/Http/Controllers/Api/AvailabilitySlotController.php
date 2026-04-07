<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;

class AvailabilitySlotController extends Controller
{
    public function index(Request$request)
    {
        $employeeId = $request->query('employee_id');
        $date = $request->query('date');

        if (!$employeeId || !$date) {
            return response()->json([
                'message' => 'employee_id and date are required.'
            ], 422);
        }

        $start = '09:00';
        $end = '18:00';

        $slots = [];

        $current = strtotime($start);
        $endTime = strtotime($end);

        while ($current < $endTime) {
            $slots[] = date('H:i', $current);
            $current = strtotime('+30 minutes', $current);
        }

        $appointments = Appointment::with('salonService')
            ->where('employee_id', $employeeId)
            ->whereDate('appointment_date', $date)
            ->whereIn('status', ['pending', 'confirmed'])
            ->get();

        $bookedSlots = [];
        
        foreach ($appointments as $appointment) {
            $startTime = strtotime($appointment->appointment_time);
            $duration = (int) $appointment->salonService->duration;

            $slotsCount = max(1, (int) ceil($duration / 30));

            for ($i = 0; $i < $slotsCount; $i++) {
                $bookedSlots[] = date('H:i', strtotime('+' . ($i * 30) . ' minutes', $startTime));
            }
        }

        $bookedSlots = array_unique($bookedSlots);

        $availableSlots = array_values(array_diff($slots, $bookedSlots));

        return response()->json($availableSlots);
    }
}
