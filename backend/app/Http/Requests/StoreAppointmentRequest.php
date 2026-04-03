<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreAppointmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'client_id' => ['required', 'exists:clients,id'],
            'employee_id' => ['required', 'exists:employees,id'],
            'salon_service_id' => ['required', 'exists:salon_services,id'],
            'appointment_date' => ['required', 'date'],
            'appointment_time' => ['required', 'date_format:H:i'],
            'status' => ['nullable', 'in:pending,confirmed,cancelled,completed'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
