<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product; 
use App\Models\ProductImages; 
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Auth;
use App\Models\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    //
    public function index()
    {
        $products = Product::OrderBy('created_at','desc')->with('images')->get();

        return response()->json($products);
    }


    public function adminindex(){ 
        $products = Product::OrderBy('product_name', 'asc')->with('images')->get();

        return response()->json($products);
    }


    // public function index()
    // {
    //     $products = Cache::remember('product', 60, function () {
    //         return Product::orderBy('created_at', 'desc')->with('images')->get();
    //     }); 

    //     return response()->json($products);
    // }



    // public function store(Request $request)
    // {
    //     // Validate the request data
    //     $request->validate([
    //         'product_category' => 'required|string',
    //         'sku' => 'required|string',
    //         'product_name' => 'required|string',
    //         'product_type' => 'required|string',
    //         'product_brand' => 'required|string',
    //         'discounted_price' => 'required|numeric',
    //         'buying_price' => 'required|numeric',
    //         'selling_price' => 'required|numeric',
    //         'stock_quantity' => 'required|integer',
    //         'description' => 'nullable|string',
    //         'specification' => 'nullable|string',
    //         'images' => 'nullable|array',
    //         'images.*' => 'nullable|string' // each image in base64 format
    //     ]);

    //     // Store the product details
    //     $product = Product::create([
    //         'product_category' => $request->product_category,
    //         'sku' => $request->sku,
    //         'product_name' => $request->product_name,
    //         'product_type' => $request->product_type,
    //         'product_brand' => $request->product_brand,
    //         'discounted_price' => $request->discounted_price,
    //         'buying_price' => $request->buying_price,
    //         'selling_price' => $request->selling_price,
    //         'stock_quantity' => $request->stock_quantity,
    //         'description' => $request->description,
    //         'specification' => $request->specification,
    //     ]);

    //     // Check if images are provided
    //     if ($request->has('images')) {
    //         foreach ($request->images as $base64Image) {
    //             // Decode the base64 image string
    //             $imageData = base64_decode($base64Image);

    //             // Generate a unique file name
    //             $imageName = uniqid() . '.png';

    //             // Define the path to save the image
    //             $imagePath = 'images/' . $imageName;

    //             // Save the image in the public/images directory
    //             Storage::disk('public')->put($imagePath, $imageData);

    //             // Store the image path and product identifier in the ProductImages table
    //             ProductImages::create([
    //                 'image_path' => $imagePath,
    //                 'product_identifier' => $product->id,
    //             ]);
    //         }
    //     }

    //     return response()->json(['message' => 'Product created successfully', 'product' => $product], 201);
    // }

    // public function store(Request $request)
    // {
    //     // Validate the request data
    //     $request->validate([
    //         'product_category' => 'required|string',
    //         'sku' => 'required|string',
    //         'product_name' => 'required|string',
    //         'product_type' => 'required|string',
    //         'product_brand' => 'required|string',
    //         'discounted_price' => 'nullable|numeric',
    //         'buying_price' => 'nullable|numeric',
    //         'selling_price' => 'required|numeric',
    //         'stock_quantity' => 'nullable|integer',
    //         'description' => 'nullable|string',
    //         'specification' => 'nullable|string',
    //         'images' => 'nullable|array',
    //         'images.*' => 'nullable|string' // each image in base64 format
    //     ]);

    //     // Store the product details
    //     $product = Product::create([
    //         'product_category' => $request->product_category,
    //         'sku' => $request->sku,
    //         'product_name' => $request->product_name,
    //         'product_type' => $request->product_type,
    //         'product_brand' => $request->product_brand,
    //         'discounted_price' => $request->discounted_price,
    //         'buying_price' => $request->buying_price,
    //         'selling_price' => $request->selling_price,
    //         'stock_quantity' => $request->stock_quantity,
    //         'description' => $request->description,
    //         'specification' => $request->specification,
    //         'tags' => $request->tags,
    //         'instock' => $request->instock
    //     ]);

    //     // Check if images are provided
    //     if ($request->has('images')) {
    //         foreach ($request->images as $base64Image) {
    //             // Decode the base64 image string
    //             $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64Image));

    //             // Generate a unique file name
    //             $imageName = uniqid() . '.webp';

    //             // Define the path to save the image (directly in public/images)
    //             $imagePath = 'images/' . $imageName;

    //             // Save the image directly in the public/images directory
    //             $fullImagePath = public_path($imagePath);
    //             file_put_contents($fullImagePath, $imageData);

    //             // Store the image path and product identifier in the ProductImages table
    //             ProductImages::create([
    //                 'image_path' => $imagePath,
    //                 'product_identifier' => $product->id,
    //             ]);
    //         }
    //     }

    //     $user = Auth::user(); 
    //     $userEmail = $user->email; 

    //     Log::create([
    //         'ip_address' => $request->ip(), 
    //         'email' => $userEmail, 
    //         'action' => "Created new product {$request['product_name']}"
    //     ]);


    //     return response()->json(['message' => 'Product created successfully', 'product' => $product], 201);
    // }

    
    public function store(Request $request)
{
    // Validate the request data
    $request->validate([
        'product_category' => 'required',
        'product_name' => 'required|string',
        'product_type' => 'nullable|string',
        'product_brand' => 'nullable|string',
        'discounted_price' => 'nullable|numeric',
        'buying_price' => 'nullable|numeric',
        'selling_price' => 'nullable|numeric',
        'stock_quantity' => 'nullable|integer',
        'description' => 'nullable|string',
        'specification' => 'nullable|string',
        'images' => 'nullable|array',
        'images.*' => 'nullable|string' // each image in base64 format
    ]);

    // Generate SKU
    $category = $request->product_category;
    $categoryPrefix = strtoupper(substr($category, 0, 2));
    
    $latestProduct = Product::where('product_category', $category)
                            ->where('sku', 'like', $categoryPrefix . '%')
                            ->orderBy('sku', 'desc')
                            ->first();

    if ($latestProduct) {
        $latestSku = $latestProduct->sku;
        $latestNumber = intval(substr($latestSku, -3));
        $newNumber = $latestNumber + 1;
    } else {
        $newNumber = 1;
    }

    $sku = $categoryPrefix . str_pad($newNumber, 3, '0', STR_PAD_LEFT);

    // Store the product details
    $product = Product::create([
        'product_category' => $request->product_category,
        'sku' => $sku,
        'product_name' => $request->product_name,
        'product_type' => $request->product_type,
        'product_brand' => $request->product_brand,
        'discounted_price' => $request->discounted_price,
        'buying_price' => $request->buying_price,
        'selling_price' => $request->selling_price,
        'stock_quantity' => $request->stock_quantity,
        'description' => $request->description,
        'specification' => $request->specification,
        'tags' => $request->tags,
        'instock' => $request->instock
    ]);

    // Check if images are provided
    if ($request->has('images')) {
        foreach ($request->images as $base64Image) {
            // Decode the base64 image string
            $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64Image));
            // Generate a unique file name
            $imageName = uniqid() . '.webp';
            // Define the path to save the image (directly in public/images)
            $imagePath = 'images/' . $imageName;
            // Save the image directly in the public/images directory
            $fullImagePath = public_path($imagePath);
            file_put_contents($fullImagePath, $imageData);
            // Store the image path and product identifier in the ProductImages table
            ProductImages::create([
                'image_path' => $imagePath,
                'product_identifier' => $product->id,
            ]);
        }
    }

    $user = Auth::user(); 
    $userEmail = $user->email; 
    Log::create([
        'ip_address' => $request->ip(), 
        'email' => $userEmail, 
        'action' => "Created new product {$request['product_name']}"
    ]);

    return response()->json(['message' => 'Product created successfully', 'product' => $product], 201);
}



    public function deleteImage(Request $request) {
        $productImage = ProductImages::find($request->id);

        if(!$productImage) { 
            return response()->json(['error' => 'Image not found'], 404);
        }

        $imagePath = public_path($productImage->image_path); 

        if(File::exists($imagePath)) {
            File::delete($imagePath); 
        }

        $user = Auth::user(); 
        $userEmail = $user->email; 

        Log::create([
            'ip_address' => $request->ip(), 
            'email' => $userEmail, 
            'action' => "Deleted the image of product with id {$request['id']}"
        ]);


        $productImage->delete(); 

        return response()->json(['success' => 'Image deleted Successfully'],200);

    }

    public function showForEdit(Request $request) {
        $product = Product::with('images')->find($request->id); 

        if(!$product) {
            return response()->json(['Product not found'],404);
        }

        return response()->json($product);
    }


    // public function show($productName){
    //     $product = Product::where('product_name', $productName)->with('images')->firstOrFail();
    //     return Inertia::render('Main/ProductShow', ['product' => $product]);
    // }

    public function show($productSlug)
{
    // Convert the slug back to a possible product name
    $possibleProductName = str_replace('-', ' ', $productSlug);

    // Try to find the product using a case-insensitive search
    $product = Product::where('product_name', 'LIKE', $possibleProductName)
        ->orWhere('product_name', 'LIKE', '%' . str_replace('-', '%', $productSlug) . '%')
        ->with('images')
        ->firstOrFail();

    return Inertia::render('Main/ProductShow', ['product' => $product]);
}


    public function addImages(Request $request) 
    {
        $request->validate([
            'images' => 'required|array', 
            'images.*' => 'required|string'
        ]); 

        $product = Product::find($request->id); 

        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }
    
        // Iterate through the provided images
        foreach ($request->images as $base64Image) {
            // Decode the base64 image string
            $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64Image));
    
            // Generate a unique file name
            $imageName = uniqid() . '.png';
    
            // Define the path to save the image (directly in public/images)
            $imagePath = 'images/' . $imageName;
    
            // Save the image directly in the public/images directory
            $fullImagePath = public_path($imagePath);
            file_put_contents($fullImagePath, $imageData);
    
            // Store the image path and product identifier in the ProductImages table

            $user = Auth::user(); 
        $userEmail = $user->email; 

        Log::create([
            'ip_address' => $request->ip(), 
            'email' => $userEmail, 
            'action' => "Added images to product with id {$request['id']}"
        ]);


            ProductImages::create([
                'image_path' => $imagePath,
                'product_identifier' => $product->id,
            ]);
        }
    
        return response()->json(['message' => 'Images added successfully'], 200);
    }


    public function update(Request $request) 
    { 
        $request->validate([
            'product_category' => 'sometimes',
            'sku' => 'sometimes|string',
            'product_name' => 'sometimes|string',
            'product_type' => 'sometimes|nullable|string',
            'product_brand' => 'sometimes|nullable|string',
            'discounted_price' => 'sometimes|nullable|numeric',
            'buying_price' => 'sometimes|nullable|numeric',
            'selling_price' => 'sometimes|nullable|numeric',
            'stock_quantity' => 'sometimes|nullable|integer',
            'description' => 'sometimes|nullable|string',
            'specification' => 'sometimes|nullable|string',
            'tags' => 'sometimes|nullable|string'
        ]);
    
        // Find the product by ID
        $product = Product::find($request->id);
    
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }
    
        // Update the product details
        $product->update($request->only([
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
        ]));


        $user = Auth::user(); 
        $userEmail = $user->email; 

        Log::create([
            'ip_address' => $request->ip(), 
            'email' => $userEmail, 
            'action' => "Updated the product with id {$request['id']}"
        ]);
    
        return response()->json(['message' => 'Product updated successfully', 'product' => $product], 200);
    }


    public function destroy(Request $request)
{
    // Find the product by ID
    $product = Product::find($request->id);

    if (!$product) {
        return response()->json(['error' => 'Product not found'], 404);
    }

    // Get all images associated with the product
    $images = $product->images;

    // Delete each image file from the public/images directory
    foreach ($images as $image) {
        $imagePath = public_path($image->image_path);

        // Check if the file exists before attempting to delete it
        if (file_exists($imagePath)) {
            unlink($imagePath);
        }

        // Delete the image record from the ProductImages table
        $image->delete();
    }

    // Delete the product
    $product->delete();

    $user = Auth::user(); 
        $userEmail = $user->email; 

        Log::create([
            'ip_address' => $request->ip(), 
            'email' => $userEmail, 
            'action' => "Deleted the product {$product['product_name']}"
        ]);

    return response()->json(['message' => 'Product and its images deleted successfully'], 200);
}


public function getLatestProducts() {
    $products = Product::with(['images'])
                ->latest()
                ->take(8)
                ->get();

    return response()->json($products);
}

}