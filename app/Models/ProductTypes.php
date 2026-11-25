<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductTypes extends Model
{
    use HasFactory;

    protected $fillable = [
        'type_name', 
        'category_identifier'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_identifier');
    }

    public function products(){ 
        return $this->hasMany(Product::class);
    }

    public function updateName($newName)
    {
        DB::transaction(function() use ($newName) {
            $oldName = $this->name;
            $this->name = $newName;
            $this->save();

            Product::where('product_type', $oldName)->update(['product_type' => $newName]);
        });
    }


}
