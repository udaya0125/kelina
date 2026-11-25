<?php

namespace App\Http\Controllers;
use App\Models\NewArrivalProduct;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse; 

class NewArrivalProductController extends Controller
{
    //
    public function index(): JsonResponse
    {
        $newarrival = NewArrivalProduct::with(['product.images'])->get();

        return response()->json($newarrival);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'product_id' => 'required|exists:products,id'
        ]);

        // Check if product is already featured
        $exists = NewArrivalProduct::where('product_id', $request->product_id)->exists();
        if ($exists) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product is already featured'
            ], 422);
        }

        $newArrivalProduct = NewArrivalProduct::create([
            'product_id' => $request->product_id
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Product added to featured list',
            'data' => $newArrivalProduct
        ], 201);
    }

    /**
     * Remove a product from featured list using product_id
     */
    public function destroy($productId): JsonResponse
    {
        $newArrivalProduct = NewArrivalProduct::where('product_id', $productId)->first();
        
        if (!$newArrivalProduct) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product not found in new arrival list'
            ], 404);
        }

        $newArrivalProduct->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Product removed from new arrival list'
        ]);
    }
}
