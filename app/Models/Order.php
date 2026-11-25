<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'name', 
        'phone', 
        'email', 
        'address', 
        'zipcode', 
        'city', 
        'order_id',
        'payment_method', 
        'instruction', 
        'contact_info', 
        'status', 
        'discount_amount',
        'coupon_code',
        'total_quantity', 
        'total_amount', 
        'cancellation_reason'
    ];

    public function items() {
        return $this->hasMany(OrderItem::class, 'order_identifier', 'id'); 
    }

    
}
