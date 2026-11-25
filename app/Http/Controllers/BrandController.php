<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Brand;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use App\Models\Log;
use Illuminate\Support\Facades\Cache;


class BrandController extends Controller
{
    //
    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'brand_name' => 'required|string|max:255',
    //         'logo' => 'nullable',
    //     ]);

    //     $user = Auth::user(); 
    //     $userEmail = $user->email; 

    //     if ($request->hasFile('logo')) {
    //         $image = $request->file('logo');
    //         $imageName = time() . '.' . $image->getClientOriginalExtension();
    //         $image->move(public_path('images'), $imageName);

    //         $brand = Brand::create([
    //             'brand_name' => $request->brand_name,
    //             'logo' => 'images/' . $imageName,
    //         ]);

    //         Log::create([
    //             'ip_address' => $request->ip(), 
    //             'email' => $userEmail, 
    //             'action' => "Created brand {$request['brand_name']}"
    //         ]);


    //         return response()->json(['message' => 'Brand created successfully', 'brand' => $brand], 201);
    //     }

    //     return response()->json(['message' => 'Logo file is required'], 400);
    // }


//     public function store(Request $request)
// {
//     $request->validate([
//         'brand_name' => 'required|string|max:255',
//         'logo' => 'nullable|image|max:2048', // Added image validation
//     ]);

//     $user = Auth::user(); 
//     $userEmail = $user->email; 

//     $brandData = [
//         'brand_name' => $request->brand_name,
//     ];

//     if ($request->hasFile('logo')) {
//         $image = $request->file('logo');
//         $imageName = time() . '.' . $image->getClientOriginalExtension();
//         $image->move(public_path('images'), $imageName);
//         $brandData['logo'] = 'images/' . $imageName;
//     }

//     $brand = Brand::create($brandData);

//     Log::create([
//         'ip_address' => $request->ip(), 
//         'email' => $userEmail, 
//         'action' => "Created brand {$request['brand_name']}"
//     ]);

//     return response()->json(['message' => 'Brand created successfully', 'brand' => $brand], 201);
// }


public function store(Request $request)
{
    $validated = $request->validate([
        'brand_name' => 'required|string|max:255',
        'logo' => 'nullable',
    ]);

    $user = Auth::user(); 
    $userEmail = $user->email; 

    $brandData = [
        'brand_name' => $request->brand_name,
    ];

    // Only process logo if it's actually in the request
    if ($request->hasFile('logo')) {
        $request->validate([
            'logo' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $image = $request->file('logo');
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('images'), $imageName);
        $brandData['logo'] = 'images/' . $imageName;
    }

    $brand = Brand::create($brandData);

    Log::create([
        'ip_address' => $request->ip(), 
        'email' => $userEmail, 
        'action' => "Created brand {$request['brand_name']}"
    ]);

    return response()->json(['message' => 'Brand created successfully', 'brand' => $brand], 201);
}


    // public function update(Request $request)
    // {
    //     $request->validate([
    //         'brand_name' => 'required|string|max:255',
    //         'logo' => 'nullable',
    //     ]);

    //     $id = $request->id;

    //     $brand = Brand::findOrFail($id);

    //     if ($request->hasFile('logo')) {
    //         // Delete old image
    //         if (file_exists(public_path($brand->logo))) {
    //             unlink(public_path($brand->logo));
    //         }

    //         // Upload new image
    //         $image = $request->file('logo');
    //         $imageName = time() . '.' . $image->getClientOriginalExtension();
    //         $image->move(public_path('images'), $imageName);
    //         $brand->logo = 'images/' . $imageName;
    //     }

    //     $brand->brand_name = $request->brand_name;
    //     $brand->save();

    //     $user = Auth::user(); 
    //     $userEmail = $user->email; 

    //     Log::create([
    //         'ip_address' => $request->ip(), 
    //         'email' => $userEmail, 
    //         'action' => "Updated brand {$request['brand_name']}"
    //     ]);

    //     return response()->json(['message' => 'Brand updated successfully', 'brand' => $brand], 200);
    // }

    public function update(Request $request)
{
    $request->validate([
        'brand_name' => 'required|string|max:255',
        'logo' => 'nullable',
    ]);

    $id = $request->id;
    $brand = Brand::findOrFail($id);
    $oldBrandName = $brand->brand_name; // Store the old brand name before updating

    if ($request->hasFile('logo')) {
        // Delete old image
        if (file_exists(public_path($brand->logo))) {
            unlink(public_path($brand->logo));
        }
        // Upload new image
        $image = $request->file('logo');
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('images'), $imageName);
        $brand->logo = 'images/' . $imageName;
    }

    // Update brand name
    $brand->brand_name = $request->brand_name;
    $brand->save();

    // Update all products that reference the old brand name
    if ($oldBrandName !== $request->brand_name) {
        Product::where('product_brand', $oldBrandName)
            ->update(['product_brand' => $request->brand_name]);
    }

    $user = Auth::user(); 
    $userEmail = $user->email; 
    Log::create([
        'ip_address' => $request->ip(), 
        'email' => $userEmail, 
        'action' => "Updated brand from {$oldBrandName} to {$request['brand_name']}"
    ]);

    return response()->json(['message' => 'Brand updated successfully', 'brand' => $brand], 200);
}

    public function destroy(Request $request)
    { 
        $brand = Brand::findOrFail($request->id); 

        if(file_exists(public_path($brand->logo))) {
            unlink(public_path($brand->logo));
        }

        $brand->delete();

        $user = Auth::user(); 
        $userEmail = $user->email; 

        Log::create([
            'ip_address' => $request->ip(), 
            'email' => $userEmail, 
            'action' => "Deleted brand {$brand['brand_name']}"
        ]);

        return response()->json(['message' => 'Brand deleted '], 200);
    }


    public function index() {
        $brands = Brand::orderBy('brand_name','asc')->get(); 
        return response()->json($brands);
    }

    // public function index() {
    //     $brands = Cache::remember('brands', 60, function () {
    //         return Brand::orderBy('created_at', 'desc')->get();
    //     }); 
    //     return response()->json($brands);
    // }
}
