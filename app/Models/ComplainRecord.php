<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComplainRecord extends Model
{
    use HasFactory;

    
    protected $fillable = [
        'client_name',
        'address',
        'primary_contact_person',
        'phone_number',
        'service_type',
        'image',
        'technician_name',
        'note',
        'complain_date',
        'fixed_date',
        'work_status',
    ]; 

    public function items()
    {
        return $this->hasMany(ComplainRecordItem::class);
    }
}
