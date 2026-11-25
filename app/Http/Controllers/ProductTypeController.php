<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductTypes; 
use App\Models\Product; 
use Illuminate\Support\Facades\Auth;
use App\Models\Log;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class ProductTypeController extends Controller
{
    //

    public function index()
    {
        $productTypes = ProductTypes::orderBy('type_name','asc')->with('category')->get();
        return response()->json($productTypes);
    }

    // public function index() {
    //     $productTypes = Cache::remember('producttype', 60, function () {
    //         return ProductTypes::orderBy('created_at', 'desc')->with('category')->get();
    //     });
    //     return response()->json($productTypes);
    // }



    // Store method to add a new ProductType
    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            'type_name' => 'required|string|max:255',
            'category_identifier' => 'required|exists:categories,id' // Assuming the primary key in Category is 'id'
        ]);

        // Create a new ProductType
        $productType = ProductTypes::create([
            'type_name' => $request->input('type_name'),
            'category_identifier' => $request->input('category_identifier')
        ]);

        $user = Auth::user(); 
        $userEmail = $user->email; 

        Log::create([
            'ip_address' => $request->ip(), 
            'email' => $userEmail, 
            'action' => "Created new product type with name {$request['type_name']}"
        ]);


        return response()->json($productType, 201); // Return the created ProductType with a 201 status code
    }

    // Delete method to remove a ProductType by ID
    public function destroy(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required | exists:product_types,id'
        ]);


        
        $productType = ProductTypes::findOrFail($validatedData['id']);

        if (!$productType) {
            return response()->json(['message' => 'ProductType not found'], 404);
        }

        $productType->delete();

        $user = Auth::user(); 
        $userEmail = $user->email; 

        Log::create([
            'ip_address' => $request->ip(), 
            'email' => $userEmail, 
            'action' => "Deleted the product type {$productType['type_name']}"
        ]);


        return response()->json(['message' => 'ProductType deleted successfully'], 200);
    }


    public function update(Request $request, ProductTypes $productType)
    {
        try {
            $request->validate([
                'type_name' => 'required|string|unique:product_types,type_name,' . $productType->id,
                'category_identifier' => 'required|exists:categories,id'
            ]);

            DB::beginTransaction();
            
            $oldName = $productType->type_name;
            $newName = $request->type_name;
            $oldCategoryId = $productType->category_identifier;
            $newCategoryId = $request->category_identifier;
            
            $changes = false;
            
            // Check if type name is changing
            if ($oldName !== $newName) {
                $productType->type_name = $newName;
                
                // Update products with old type name
                Product::where('product_type', $oldName)
                      ->update(['product_type' => $newName]);
                      
                $changes = true;
            }
            
            // Check if category is changing
            if ($oldCategoryId != $newCategoryId) {
                $productType->category_identifier = $newCategoryId;
                $changes = true;
            }
            
            // Only save if there are actual changes
            if ($changes) {
                $productType->save();
            }
            
            DB::commit();
            
            return response()->json([
                'message' => 'Product type updated successfully',
                'productType' => $productType->fresh(['category'])
            ]);
            
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to update product type',
                'error' => $e->getMessage()
            ], 500);
        }
    }



}
