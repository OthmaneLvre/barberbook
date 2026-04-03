<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAppointmentRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'client_id' => ['sometimes', 'required', 'exists:clients,id'],
            'employee_id' => ['sometimes', 'required', 'exists:employees,id'],
            'salon_service_id' => ['sometimes', 'required', 'exists:salon_services,id'],
            'appointment_date' => ['sometimes', 'required', 'date'],
            'appointment_time' => ['sometimes', 'required', 'date_format:H:i'],
            'status' => ['sometimes', 'required', 'in:pending,confirmed,cancelled,completed'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
