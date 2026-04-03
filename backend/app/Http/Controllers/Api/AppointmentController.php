<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAppointmentRequest;
use App\Http\Requests\UpdateAppointmentRequest;
use App\Models\Appointment;
use App\Models\SalonService;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function index(Request $request)
    {
        $query = Appointment::with(['client', 'employee.user', 'salonService'])
            ->latest();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('employee_id')) {
            $query->where('employee_id', $request->employee_id);
        }

        if ($request->filled('appointment_date')) {
            $query->whereDate('appointment_date', $request->appointment_date);
        }

        $appointments = $query->get();

        return response()->json($appointments);
    }

    public function store(StoreAppointmentRequest $request)
    {
        $service = SalonService::findOrFail($request->salon_service_id);

        $existingAppointment = Appointment::where('employee_id', $request->employee_id)
            ->whereDate('appointment_date', $request->appointment_date)
            ->whereTime('appointment_time', $request->appointment_time . ':00')
            ->whereIn('status', ['pending', 'confirmed'])
            ->exists();

        if ($existingAppointment) {
            return response()->json([
                'message' => 'This time slot is already booker for this employee.'
            ], 422);
        }

        $appointment = Appointment::create([
            'client_id' => $request->client_id,
            'employee_id' => $request->employee_id,
            'salon_service_id' => $request->salon_service_id,
            'appointment_date' => $request->appointment_date,
            'appointment_time' => $request->appointment_time,
            'status' => $request->status ?? 'pending',
            'notes' => $request->notes,
        ]);

        $appointment->load(['client', 'employee.user', 'salonService']);

        return response()->json([
            'message' => 'Appointment created successfully',
            'appointment' => $appointment,
        ], 201);
    }

    public function show(Appointment $appointment)
    {
        $appointment->load(['client', 'employee.user', 'salonService']);

        return response()->json($appointment);
    }

    public function update(UpdateAppointmentRequest $request, Appointment $appointment)
    {
        $employeeId = $request->employee_id ?? $appointment->employee_id;
        $appointmentDate = $request->appointment_date ?? $appointment->appointment_date;
        $appointmentTime = $request->appointment_time ?? $appointment->appointment_time;

        $formattedTime = strlen($appointmentTime) === 5
            ? $appointmentTime . '.00'
            : $appointmentTime;

        // on vérifie seulement si le créneau change
        if (
            $employeeId != $appointment->employee_id ||
            $appointmentDate != $appointment->appointment_date ||
            $formattedTime != $appointment->appointment_time
        ) {

            $existingAppointment = Appointment::where('employee_id', $employeeId)
                ->whereDate('appointment_date', $appointmentDate)
                ->whereTime('appointment_time', $formattedTime)
                ->whereIn('status', ['pending', 'confirmed'])
                ->where('id', '!=', $appointment->id)
                ->exists();

            if ($existingAppointment) {
                return response()->json([
                    'message' => 'This time slot is already booked for this employee.'
                ], 422);
            }
        }

        $appointment->update($request->validated());

        $appointment->load(['client', 'employee.user', 'salonService']);

        return response()->json([
            'message' => 'Appointment updated successfully',
            'appointment' => $appointment,
        ]);
    }

    public function destroy(Appointment $appointment)
    {
        $appointment->delete();

        return response()->json([
            'message' => 'Appointment deleted successfully'
        ]);
    }
}
