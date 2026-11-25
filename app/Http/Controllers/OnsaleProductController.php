<?php

namespace App\Http\Controllers;
use App\Models\OnsaleProduct;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse; 

class OnsaleProductController extends Controller
{
    //

    public function index(): JsonResponse
    {
        $onsaleProducts = OnsaleProduct::with(['product.images'])->get();

        return response()->json($onsaleProducts);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);

        // Check if product is already featured
        $exists = OnsaleProduct::where('product_id', $request->product_id)->exists();
        if ($exists) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product is already featured'
            ], 422);
        }

        $onsaleProduct = OnsaleProduct::create([
            'product_id' => $request->product_id
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Product added to featured list',
            'data' => $onsaleProduct
        ], 201);
    }

    /**
     * Remove a product from featured list using product_id
     */
    public function destroy($productId): JsonResponse
    {
        $onsaleProduct = OnsaleProduct::where('product_id', $productId)->first();
        
        if (!$onsaleProduct) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product not found in featured list'
            ], 404);
        }

        $onsaleProduct->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Product removed from featured list'
        ]);
    }
}
