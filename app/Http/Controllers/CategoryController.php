<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category; 
use App\Models\Product; 
use Illuminate\Support\Facades\Auth;
use App\Models\Log;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log as LogFacade;

class CategoryController extends Controller
{
    //

    public function index()
    {
        $categories = Category::orderBy('Category_name', 'asc')->get(); // Fetch all categories from the database
        return response()->json($categories); // Return the categories as a JSON response
    }

    // public function index()
    // {
    //     $categories = Cache::remember('categories', 60, function () {
    //         return Category::orderBy('created_at', 'desc')->get();
    //     });

    //     return response()->json($categories);
    // }

    // Method to store a new category
    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'Category_name' => 'required|string|max:255', // Validate that category name is provided
            'image' => 'nullable',
        ]);

        $categoryData = [
            'Category_name' => $request->Category_name,
        ];

        if ($request->hasFile('image')) {
            $request->validate([
                'image' => 'image|max:2048',
            ]);
            $image = $request->file('image');
            $imageName = time().'.'.$image->getClientOriginalExtension();

            $image->move(public_path('images'), $imageName);
            $categoryData['image'] = 'images/' . $imageName; 
        }

        // Create a new category record
        // $category = Category::create([
        //     'Category_name' => $request->Category_name, // Use the request data to set the category name
        // ]);

        $category = Category::create($categoryData);

        $user = Auth::user(); 
        $userEmail = $user->email; 

        Log::create([
            'ip_address' => $request->ip(), 
            'email' => $userEmail, 
            'action' => "Created new Category {$request['Category_name']}"
        ]);

        return response()->json(['message' => 'Category created successfully', 'category' => $category], 201);
    }

    // Method to delete a category by ID
    public function destroy(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required|exists:categories,id'
        ]); 

        $category = Category::findOrFail($validatedData['id']);

        


        if(!$category) {
            return response()->json(['message'=> 'Category not found'],404); 
        }

        if(file_exists(public_path($category->image))) {
            unlink(public_path($category->image));
        }

        $category->delete();

        $user = Auth::user(); 
        $userEmail = $user->email; 

        Log::create([
            'ip_address' => $request->ip(), 
            'email' => $userEmail, 
            'action' => "Deleted Category {$category['Category_name']}"
        ]);

        return response()->json('Category deleted successfully');
    }


    // public function topCategoriesWithMostProductTypes()
    // {
    //     $topCategories = Category::withCount('productTypes') // Count the number of product types for each category
    //         ->orderBy('product_types_count', 'desc') // Order by the count in descending order
    //         ->take(8) // Limit to top 8 categories
    //         ->get(); // Execute the query

    //     return response()->json($topCategories); // Return as JSON response
    // }

    public function topCategoriesWithMostProductTypes()
    {
        $topCategories = Cache::remember('topcategories', 60, function () {
            return Category::withCount('productTypes')
            ->orderBy('product_types_count', 'desc')
            ->take(8)
            ->get();
        }); 

        return response()->json($topCategories); 
    }




    // public function update(Request $request, Category $category)
    // {
    //     try {
    //         $request->validate([
    //             'category_name' => 'required|string|unique:categories,Category_name,' . $category->id,
    //             'image' => 'nullable|image|max:2048'
    //         ]);

    //         DB::beginTransaction();
            
    //         $oldName = $category->Category_name;
    //         $newName = $request->category_name;

            
    //         if ($request->hasFile('image')) {
    //             // Delete old image if it exists
    //             if ($category->image && file_exists(public_path($category->image))) {
    //                 unlink(public_path($category->image));
    //             }
                
    //             // Upload new image
    //             $image = $request->file('image');
    //             $imageName = time() . '.' . $image->getClientOriginalExtension();
    //             $image->move(public_path('images'), $imageName);
    //             $category->image = 'images/' . $imageName;
    //         }


    //         // Only proceed if there's actually a change
    //         if ($oldName !== $newName) {
    //             // Update category name
    //             $category->Category_name = $newName;
    //             $category->save();
                
    //             // Update product_category in products table
    //             Product::where('product_category', $oldName)
    //                   ->update(['product_category' => $newName]);
    //         }
            
    //         DB::commit();
            
    //         return response()->json([
    //             'message' => 'Category updated successfully',
    //             'category' => $category->fresh()
    //         ]);
            
    //     } catch (Exception $e) {
    //         DB::rollBack();
    //         return response()->json([
    //             'message' => 'Failed to update category',
    //             'error' => $e->getMessage()
    //         ], 500);
    //     }
    // }


//     public function update(Request $request, Category $category)
// {
//     try {

//         \Illuminate\Support\Facades\Log::info('Raw request data:', [
//             'all' => $request->all(),
//             'files' => $request->allFiles(),
//             'headers' => $request->headers->all()
//         ]);

//         // You can also store logs in a specific file
//         \Illuminate\Support\Facades\Log::channel('daily')->info('Category update attempt', [
//             'request_data' => $request->all(),
//             'category_id' => $category->id
//         ]);


//         $request->validate([
//             'category_name' => 'required|string|unique:categories,Category_name,' . $category->id,
//             'image' => 'nullable|image|max:2048',
//         ]);

//         \Illuminate\Support\Facades\Log::info('Passed validation');


//         DB::beginTransaction();
        
//         $oldName = $category->Category_name;
//         $newName = $request->input('category_name');
        
//         // Handle image update if new image is provided
//         if ($request->hasFile('image')) {
//             // Delete old image if it exists
//             if ($category->image && file_exists(public_path($category->image))) {
//                 unlink(public_path($category->image));
//             }
            
//             // Upload new image
//             $image = $request->file('image');
//             $imageName = time() . '.' . $image->getClientOriginalExtension();
//             $image->move(public_path('images'), $imageName);
//             $category->image = 'images/' . $imageName;
//         }
        
//         // Update category name if changed
//         if ($oldName !== $newName) {
//             $category->Category_name = $newName;
            
//             // Update product_category in products table
//             Product::where('product_category', $oldName)
//                   ->update(['product_category' => $newName]);
//         }
        
//         $category->save();
        
//         // Log the update action
//         $user = Auth::user();
//         $userEmail = $user->email;
        
//         $logMessage = "Updated category";
//         if ($oldName !== $newName) {
//             $logMessage .= " name from {$oldName} to {$newName}";
//         }
//         if ($request->hasFile('image')) {
//             $logMessage .= " and updated image";
//         }
        
//         Log::create([
//             'ip_address' => $request->ip(),
//             'email' => $userEmail,
//             'action' => $logMessage
//         ]);
        
//         DB::commit();
        
//         return response()->json([
//             'message' => 'Category updated successfully',
//             'category' => $category->fresh()
//         ]);
        
//     } catch (Exception $e) {

//         \Illuminate\Support\Facades\Log::error('Category update failed', [
//             'error' => $e->getMessage(),
//             'trace' => $e->getTraceAsString()
//         ]);

//         DB::rollBack();
//         return response()->json([
//             'message' => 'Failed to update category',
//             'error' => $e->getMessage()
//         ], 500);
//     }
// }


public function update(Request $request, Category $category)
{
    try {

        \Illuminate\Support\Facades\Log::info('Raw request data:', [
            'all' => $request->all(),
            'files' => $request->allFiles(),
            'headers' => $request->headers->all()
        ]);

        // You can also store logs in a specific file
        \Illuminate\Support\Facades\Log::channel('daily')->info('Category update attempt', [
            'request_data' => $request->all(),
            'category_id' => $category->id
        ]);


        $request->validate([
            'category_name' => 'required|string|unique:categories,Category_name,' . $category->id,
            'image' => 'nullable',
        ]);

        \Illuminate\Support\Facades\Log::info('Passed validation');


        DB::beginTransaction();
        
        $id = $request->id;
        $oldName = Category::findOrFail($id);
        //$oldName = $category->Category_name;
        $newName = $request->input('category_name');
        
        // Handle image update if new image is provided
        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($category->image && file_exists(public_path($category->image))) {
                unlink(public_path($category->image));
            }
            
            // Upload new image
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
            $category->image = 'images/' . $imageName;
        }
        
        // Update category name if changed
        if ($oldName !== $newName) {
            $category->Category_name = $newName;
            
            // Update product_category in products table
            Product::where('product_category', $oldName)
                  ->update(['product_category' => $newName]);
        }
        
        $category->save();
        
        // Log the update action
        $user = Auth::user();
        $userEmail = $user->email;
        
        $logMessage = "Updated category";
        if ($oldName !== $newName) {
            $logMessage .= " name from {$oldName} to {$newName}";
        }
        if ($request->hasFile('image')) {
            $logMessage .= " and updated image";
        }
        
        Log::create([
            'ip_address' => $request->ip(),
            'email' => $userEmail,
            'action' => $logMessage
        ]);
        
        DB::commit();
        
        return response()->json([
            'message' => 'Category updated successfully',
            'category' => $category->fresh()
        ]);
        
    } catch (Exception $e) {

        \Illuminate\Support\Facades\Log::error('Category update failed', [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);

        DB::rollBack();
        return response()->json([
            'message' => 'Failed to update category',
            'error' => $e->getMessage()
        ], 500);
    }
}



    public function categoriesWithItems(){
        $categories = Category::withCount('products')->get();

        return response()->json($categories);
    }


    public function getTopCategoriesWithProducts()
    {
        try {
            $topCategories = Category::withCount('products')
                ->with(['products' => function($query) {
                    $query->with(['images' => function($query) {
                        $query->select('id', 'product_identifier', 'image_path');
                    }])
                    ->select(
                        'id',
                        'product_category',
                        'product_name',
                        'discounted_price',
                        'selling_price',
                        'stock_quantity',
                        'description',
                        'instock'
                    );
                }])
                ->orderBy('products_count', 'desc')
                ->take(3)
                ->get()
                ->map(function ($category) {
                    return [
                        'id' => $category->id,
                        'name' => $category->Category_name,
                        'image' => $category->image,
                        'productsCount' => $category->products_count,
                        'products' => $category->products->map(function ($product) {
                            return [
                                'id' => $product->id,
                                'product_name' => $product->product_name,
                                'discounted_price' => $product->discounted_price,  'selling_price'=>$product->selling_price,
                                'description' => $product->description,
                                'instock' => $product->instock,
                                'stockQuantity' => $product->stock_quantity,
                                // 'images' => $product->images->pluck('image_path')->toArray(),
                                'images' => $product->images
                            ];
                        })
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => [
                    'categories' => $topCategories
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch categories and products',
                'error' => $e->getMessage()
            ], 500);
        }
    }



    public function getCategoriesWithTypes() {
        // $categorieswithtypes = Category::with('productTypes')->get(); 
        $categorieswithtypes = Category::with(['productTypes'])
        ->withCount('productTypes')
        ->orderBy('product_types_count', 'desc')
        ->get();
        return response()->json($categorieswithtypes);
    }


}
