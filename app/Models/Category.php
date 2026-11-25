<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ProductTypes;
use Illuminate\Support\Facades\DB;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'Category_name', 
        'image'
    ]; 

    public function productTypes()
    {
        return $this->hasMany(ProductTypes::class, 'category_identifier');
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'product_category');
    }

    public function updateName($newName)
    {
        DB::transaction( function () use ($newName){
            $oldName = $this->name;
            $this->name = $newName;
            $this->save();

            Product::where('product_category', $oldName)->update(['product_category' => $newName]);
        });
    }

}
