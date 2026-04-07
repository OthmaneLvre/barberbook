<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAvailabilityRequest;
use App\Http\Requests\UpdateAvailabilityRequest;
use App\Models\Availability;
use Illuminate\Http\Request;

class AvailabilityController extends Controller
{
    public function index(Request $request)
    {
        $query = Availability::with('employee.user')->latest();

        if ($request->filled('employee_id')) {
            $query->where('employee_id', $request->employee_id);
        }

        if ($request->filled('day_of_week')) {
            $query->where('day_of_week', $request->day_of_week);
        }

        $availabilities = $query->get();

        return response()->json($availabilities);
    }

    public function store(StoreAvailabilityRequest $request)
    {
        $alreadyExists = Availability::where('employee_id', $request->employee_id)
            ->where('day_of_week', $request->day_of_week)
            ->exists();

        if ($alreadyExists) {
            return response()->json([
                'message' => 'An availability already exists for this employee on this day.'
            ], 422);
        }

        $availability = Availability::create([
            'employee_id' => $request->employee_id,
            'day_of_week' => $request->day_of_week,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'is_active' => $request->is_active ?? true,
        ]);

        $availability->load('employee.user');

        return response()->json([
            'message' => 'Availability created successfully',
            'availability' => $availability,
        ], 201);
    }

    public function show(Availability $availability)
    {
        $availability->load('employee.user');

        return response()->json($availability);
    }

    public function update(UpdateAvailabilityRequest $request, Availability $availability)
    {
        $employeeId = $request->employee_id ?? $availability->employee_id;
        $dayOfWeek = $request->day_of_week ?? $availability->day_of_week;

        $alreadyExists = Availability::where('employee_id', $employeeId)
            ->where('day_of_week', $dayOfWeek)
            ->where('id', '!=', $availability->id)
            ->exists();

        if ($alreadyExists) {
            return response()->json([
                'message' => 'An availability already exists for this employee on this day.'
            ], 422);
        }

        $availability->update($request->validated());

        $availability->load('employee.user');

        return response()->json([
            'message' => 'Availability updated sucessfully',
            'availability' => $availability,
        ]);
    }

    public function destroy(Availability $availability)
    {
        $availability->delete();

        return response()->json([
            'message' => 'Availability deleted successfully'
        ]);
    }
}
