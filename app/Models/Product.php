<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'product_category', 
        'sku', 
        'product_name', 
        'product_type', 
        'product_brand', 
        'discounted_price', 
        'buying_price', 
        'selling_price', 
        'stock_quantity', 
        'description', 
        'specification',
        'tags', 
        'instock'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'product_category');
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class, 'product_brand', 'brand_name');
    }

    public function productType()
    {
        return $this->belongsTo(ProductType::class, 'product_type', 'type_name');
    }

    public function images() {
        return $this->hasMany(ProductImages::class, 'product_identifier', 'id' );
    }


    //new 

    public function featuredProducts(){
        return $this->hasMany(FeaturedProduct::class);
    }
}
