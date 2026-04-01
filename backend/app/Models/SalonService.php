<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SalonService extends Model
{
    use HasFactory;

    protected $table = 'salon_services';

    protected $fillable = [
        'name',
        'duration',
        'price',
        'description',
        'is_active',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
}
