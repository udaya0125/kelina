<?php

namespace App\Http\Controllers;
use App\Models\BestDealProduct;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
class BestDealProductController extends Controller
{
    public function index(): JsonResponse
    {
        $bestdealproducts = BestDealProduct::with(['product.images'])->get();

        return response()->json($bestdealproducts);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);

        // Check if product is already featured
        $exists = BestDealProduct::where('product_id', $request->product_id)->exists();
        if ($exists) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product is already featured'
            ], 422);
        }

        $bestdealproduct = BestDealProduct::create([
            'product_id' => $request->product_id
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Product added to featured list',
            'data' => $bestdealproduct
        ], 201);
    }

    /**
     * Remove a product from featured list using product_id
     */
    public function destroy($productId): JsonResponse
    {
        $bestdealproduct = BestDealProduct::where('product_id', $productId)->first();
        
        if (!$bestdealproduct) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product not found in featured list'
            ], 404);
        }

        $bestdealproduct->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Product removed from featured list'
        ]);
    }
}
