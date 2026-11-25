<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComplainRecordItem extends Model
{
    use HasFactory;

     protected $fillable = [
        'complain_record_id',
        'item',
        'quantity',
        'rate',
        'amount',
        'remarks',
    ];


    public function complainRecord()
    {
        return $this->belongsTo(ComplainRecord::class);
    }
}
