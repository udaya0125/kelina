<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wishlist; 
use Illuminate\Support\Facades\Cache;

class WishlistController extends Controller
{
    //

    public function store(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'required|exists:products,id', 
            'user_id' => 'required|exists:users,id'
        ]);
        
        $existingWishlistItem = Wishlist::where('product_id', $data['product_id'])
                                        ->where('user_id', $data['user_id'])
                                        ->first();

        if($existingWishlistItem){
            return response()->json(['message' => 'Product already in the wishlist'],200);
        }

    Wishlist::create($data); 
    return response()->json(['message' => 'Product added to wishlist']); 
    }


    public function destroy($id)
    {
        $wishlistItem = Wishlist::findOrFail($id); 
        $wishlistItem->delete(); 

        return response()->json(['message'=>'Product removed from wishlist']);
    }

    // public function index($userId)
    // {
    //     $wishlistItems = Wishlist::with('product')->where('user_id', $userId)->get();

    //     return response()->json($wishlistItems);
    // }

    public function index($userId) 
    {
        $wishlistItems = Wishlist::with(['product.images'])->where('user_id', $userId)->get();

        return response()->json($wishlistItems);
    }

    // public function index($userId)
    // {
    //     $wishlist = Cache::remember("wishlist_user_{$userId}", 60, function () use($userId) {
    //         return Wishlist::with(['product.images'])->where('user_id', $userId)->get();
    //     });

    //     return response()->json($wishlist);
    // }


}
