<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Promocode;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Models\Log;
class PromoCodeController extends Controller
{
    //
    public function store(Request $request)
    {
        $request->validate([
            'promocode' => 'required|string|unique:promocodes,promocode',
            'discount_type' => 'required|string',
            'discount_amount' => 'required|numeric',
            'validity' => 'required|date',
            'created_by' => 'required|string',
        ]);

        $promocode = Promocode::create([
            'promocode' => $request->promocode,
            'discount_type' => $request->discount_type,
            'discount_amount' => $request->discount_amount,
            'validity' => Carbon::parse($request->validity)->format('Y-m-d'),
            'created_by' => $request->created_by,
        ]);

        $user = Auth::user(); 
        $userEmail = $user->email; 

        Log::create([
            'ip_address' => $request->ip(), 
            'email' => $userEmail, 
            'action' => "Created new promo code by the name {$request['promocode']}"
        ]);


        return response()->json(['message' => 'Promocode created successfully', 'data' => $promocode], 201);
    }

    // Get all promocodes
    public function index()
    {
        $promocodes = Promocode::all();
        return response()->json($promocodes, 200);
    }

    // Get a specific promocode by ID
    public function show($id)
    {
        $promocode = Promocode::findOrFail($id);
        return response()->json($promocode, 200);
    }

    // Update a promocode
    public function update(Request $request)
    {
        $promocode = Promocode::findOrFail($request->id);

        $request->validate([
            'promocode' => 'sometimes|string|unique:promocodes,promocode,' . $request->id,
            'discount_type' => 'sometimes|string',
            'discount_amount' => 'sometimes|numeric',
            'validity' => 'sometimes|date',
            'created_by' => 'sometimes|string',
        ]);

        $promocode->update([
            'promocode' => $request->promocode,
            'discount_type' => $request->discount_type,
            'discount_amount' => $request->discount_amount,
            'validity' => Carbon::parse($request->validity)->format('Y-m-d'),
            'created_by' => $request->created_by,
        ]);

        $user = Auth::user(); 
        $userEmail = $user->email; 

        Log::create([
            'ip_address' => $request->ip(), 
            'email' => $userEmail, 
            'action' => "Updated the promo code {$promocode['promocode']}"
        ]);


        return response()->json(['message' => 'Promocode updated successfully', 'data' => $promocode], 200);
    }

    // Delete a promocode
    public function destroy(Request $request)
    {
        $promocode = Promocode::findOrFail($request->id);
        $promocode->delete();

        $user = Auth::user(); 
        $userEmail = $user->email; 

        Log::create([
            'ip_address' => $request->ip(), 
            'email' => $userEmail, 
            'action' => "Deleted the promo code {$promocode['promocode']}"
        ]);


        return response()->json(['message' => 'Promocode deleted successfully'], 200);
    }

    // public function apply(Request $request)
    // {
    //     $request->validate([
    //         'code' => 'required|string',
    //         'subtotal' => 'required|numeric',
    //     ]);

    //     $promocode = Promocode::where('promocode', $request->code)
    //                           ->where('validity', '>=', now())
    //                           ->first();

    //     if (!$promocode) {
    //         return response()->json(['error' => 'Invalid or expired promocode'], 400);
    //     }

    //     $subtotal = $request->subtotal;
    //     $discountAmount = 0;

    //     if ($promocode->discount_type === 'percentage') {
    //         $discountAmount = $subtotal * ($promocode->discount_amount / 100);
    //     } else {
    //         $discountAmount = min($promocode->discount_amount, $subtotal);
    //     }

    //     $discountedTotal = $subtotal - $discountAmount;

        

    //     return response()->json([
    //         'success' => true,
    //         'promoCode' => $promocode->promocode,
    //         'discount_amount' => $discountAmount,
    //         'discounted_total' => $discountedTotal,
    //     ]);
    // }

    public function apply(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
            'cart' => 'required|array',
        ]);

        $promocode = Promocode::where('promocode', $request->code)
                              ->where('validity', '>=', now())
                              ->first();

        if (!$promocode) {
            return response()->json(['error' => 'Invalid or expired promocode'], 400);
        }

        $subtotal = $this->calculateSubtotal($request->cart);
        $discountAmount = $this->calculateDiscount($promocode, $subtotal);
        $discountedTotal = $subtotal - $discountAmount;

        return response()->json([
            'success' => true,
            'promoCode' => $promocode->promocode,
            'discount_amount' => $discountAmount,
            'discounted_total' => $discountedTotal,
        ]);
    }

    public function validate(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
            'cart' => 'required|array',
        ]);

        $promocode = Promocode::where('promocode', $request->code)
                              ->where('validity', '>=', now())
                              ->first();

        if (!$promocode) {
            return response()->json(['error' => 'Invalid or expired promocode'], 400);
        }

        $subtotal = $this->calculateSubtotal($request->cart);
        $discountAmount = $this->calculateDiscount($promocode, $subtotal);

        return response()->json([
            'success' => true,
            'discount_amount' => $discountAmount,
        ]);
    }

    private function calculateSubtotal(array $cart): float
    {
        return array_reduce($cart, function ($total, $item) {
            return $total + ($item['quantity'] * $item['selling_price']);
        }, 0);
    }

    private function calculateDiscount(Promocode $promocode, float $subtotal): float
    {
        if ($promocode->discount_type === 'percentage') {
            return $subtotal * ($promocode->discount_amount / 100);
        } else {
            return min($promocode->discount_amount, $subtotal);
        }
    }

}
