<?php

namespace App\Http\Controllers;
use App\Models\FeaturedProduct;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FeaturedProductController extends Controller
{
    //
    public function index(): JsonResponse
    {
        $featuredProducts = FeaturedProduct::with(['product.images'])->get();

        return response()->json($featuredProducts);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);

        // Check if product is already featured
        $exists = FeaturedProduct::where('product_id', $request->product_id)->exists();
        if ($exists) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product is already featured'
            ], 422);
        }

        $featuredProduct = FeaturedProduct::create([
            'product_id' => $request->product_id
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Product added to featured list',
            'data' => $featuredProduct
        ], 201);
    }

    /**
     * Remove a product from featured list using product_id
     */
    public function destroy($productId): JsonResponse
    {
        $featuredProduct = FeaturedProduct::where('product_id', $productId)->first();
        
        if (!$featuredProduct) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product not found in featured list'
            ], 404);
        }

        $featuredProduct->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Product removed from featured list'
        ]);
    }
    
}



