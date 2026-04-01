<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'employee_id',
        'salon_service_id',
        'appointment_date',
        'appointment_time',
        'status',
        'notes',
    ];

    protected $casts = [
        'appointment_date' => 'date',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function salonService()
    {
        return $this->belongsTo(SalonService::class);
    }
}
