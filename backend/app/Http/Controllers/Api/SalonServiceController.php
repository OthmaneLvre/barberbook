<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SalonService;
use Illuminate\Http\Request;

class SalonServiceController extends Controller
{
    public function index()
    {
        $services = SalonService::where('is_active', true)->get();

        return response()->json($services);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'duration' => ['required', 'integer', 'min:15'],
            'price' => ['required', 'numeric', 'min:0'],
            'description' => ['nullable', 'string'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $service = SalonService::create([
            'name' => $validated['name'],
            'duration' => $validated['duration'],
            'price' => $validated['price'],
            'description' => $validated['description'] ?? null,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return response()->json([
            'message' => 'Salon service created successfully',
            'service' => $service,
        ], 201);
    }

    public function show(SalonService $salonService)
    {
        return response()->json($salonService);
    }

    public function update(Request $request, SalonService $salonService)
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'duration' => ['sometimes', 'required', 'integer', 'min:15'],
            'price' => ['sometimes', 'required', 'numeric', 'min:0'],
            'description' => ['nullable', 'string'],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        $salonService->update($validated);

        return response()->json([
            'message' => 'Salon service updated successfully',
            'service' => $salonService,
        ]);
    }

    public function destroy(SalonService $salonService)
    {
        $salonService->delete();

        return response()->json([
            'message' => 'Salon service deleted successfully',
        ]);
    }
}
