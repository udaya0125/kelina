<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order; 
use App\Models\OrderItem; 
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use App\Models\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderConfirmation;
use App\Mail\NewOrderNotification;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('items')->orderBy('created_at', 'desc')->get(); // Retrieve orders with related items
        return response()->json($orders);
    }

    // Store method to create a new order and its items
    // public function store(Request $request)
    // {
    //     // Validate request data
    //     $request->validate([
    //         'user_id' => 'required|string',
    //         'form.name' => 'required|string',
    //         'form.phone' => 'required|string',
    //         'form.email' => 'required|email',
    //         'form.address' => 'required|string',
    //         'form.zipCode' => 'required|string',
    //         'form.city' => 'required|string',
    //         'form.paymentMethod' => 'required|string',
    //         'total_amount'=>'required', 
    //         'total_quantity'=>'required',
    //         'items' => 'required|array', // Expecting items to be sent as an array
    //         'items.*.product_name' => 'required|string',
    //         'items.*.id' => 'required|integer',
    //         'items.*.selling_price' => 'required|numeric',
    //         'items.*.quantity' => 'required|integer',
    //     ]);

    //     // Generate unique order_id
    //     $order_id = $this->generateShorterOrderId(8);

    //     // Create the order
    //     $order = Order::create([
    //         'user_id' => $request->user_id,
    //         'name' => $request->form['name'],
    //         'phone' => $request->form['phone'],
    //         'email' => $request->form['email'],
    //         'address' => $request->form['address'],
    //         'zipcode' => $request->form['zipCode'],
    //         'city' => $request->form['city'],
    //         'order_id' => $order_id,
    //         'payment_method' => $request->form['paymentMethod'],
    //         'instruction' => $request->specialInstruction,
    //         'contact_info' => $request->contact_info,
    //         'status' => $request->status ?? 'Pending', // Default status
    //         'discount_amount' => $request->discount_amount,
    //         'coupon_code' => $request->coupon_code,
    //         'total_amount'=>$request->total_amount, 
    //         'total_quantity'=>$request->total_quantity
    //     ]);

    //     // Store each order item
    //     foreach ($request->items as $item) {
    //         OrderItem::create([
    //             'order_identifier' => $order->id,
    //             'item_name' => $item['product_name'],
    //             'product_id' => $item['id'],
    //             'product_price' => $item['selling_price'],
    //             'quantity' => $item['quantity'],
    //         ]);
    //     }

    //     return response()->json(['message' => 'Order created successfully!', 'order' => $order], 201);
    // }

    public function store(Request $request)
    {
        // Validate request data
        $request->validate([
            'user_id' => 'required|string',
            'form.name' => 'required|string',
            'form.phone' => 'required|string',
            'form.email' => 'required|email',
            'form.address' => 'required|string',
            'form.zipCode' => 'required|string',
            'form.city' => 'required|string',
            'form.paymentMethod' => 'required|string',
            'total_amount'=>'required', 
            'total_quantity'=>'required',
            'items' => 'required|array', // Expecting items to be sent as an array
            'items.*.product_name' => 'required|string',
            'items.*.id' => 'required|integer',
            'items.*.selling_price' => 'required|numeric',
            'items.*.quantity' => 'required|integer',
        ]);

        // Generate unique order_id
        $order_id = $this->generateShorterOrderId(8);

        // Create the order
        $order = Order::create([
            'user_id' => $request->user_id,
            'name' => $request->form['name'],
            'phone' => $request->form['phone'],
            'email' => $request->form['email'],
            'address' => $request->form['address'],
            'zipcode' => $request->form['zipCode'],
            'city' => $request->form['city'],
            'order_id' => $order_id,
            'payment_method' => $request->form['paymentMethod'],
            'instruction' => $request->specialInstruction,
            'contact_info' => $request->contact_info,
            'status' => $request->status ?? 'Pending', // Default status
            'discount_amount' => $request->discount_amount,
            'coupon_code' => $request->coupon_code,
            'total_amount'=>$request->total_amount, 
            'total_quantity'=>$request->total_quantity
        ]);

        // Store each order item
        $orderItems = [];
        foreach ($request->items as $item) {
            $orderItem = OrderItem::create([
                'order_identifier' => $order->id,
                'item_name' => $item['product_name'],
                'product_id' => $item['id'],
                'product_price' => $item['selling_price'],
                'quantity' => $item['quantity'],
            ]);
            $orderItems[] = $orderItem;
        }

        // Prepare order data for emails
        $orderData = [
            'order' => $order,
            'items' => $orderItems,
            'customer' => [
                'name' => $request->form['name'],
                'email' => $request->form['email'],
                'phone' => $request->form['phone'],
                'address' => $request->form['address'] . ', ' . $request->form['city'] . ', ' . $request->form['zipCode'],
            ]
        ];

        // Send email to customer
        Mail::to($request->form['email'])
            ->send(new OrderConfirmation($orderData));

        // Send email to owner
        $ownerEmail = config('mail.owner_email', 'owner@example.com'); // Get from config or use default
        Mail::to($ownerEmail)
            ->send(new NewOrderNotification($orderData));

        return response()->json(['message' => 'Order created successfully!', 'order' => $order], 201);
    }

    // Delete method to remove an order and its items
    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        
        // Cascade deletion will automatically delete related order items due to foreign key constraint
        $order->delete();

        return response()->json(['message' => 'Order deleted successfully!'], 200);
    }


    private function generateShorterOrderId($length= 8) 
    { 
        $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $timestamp = now()->format('ymd'); // Current date in 'yymmdd' format
        
        do {
            $randomPart = substr(str_shuffle($characters), 0, $length - strlen($timestamp));
            $orderId = $timestamp . $randomPart;
        } while (Order::where('order_id', $orderId)->exists());
    
        return $orderId;
    }


    public function updateStatus(Request $request)
    {
        $request->validate([
            'orderId' => 'required|exists:orders,id',
            'status' => 'required|in:Pending,Approved,Shipped,Out for delivery,Delivered',
        ]);

        $order = Order::findOrFail($request->orderId);
        $order->status = $request->status;
        $order->save();

        
        $user = Auth::user(); 
        $userEmail = $user->email; 

        Log::create([
            'ip_address' => $request->ip(), 
            'email' => $userEmail, 
            'action' => "Updated status for order {$request['order_id']} to {$request['status']}"
        ]);



        return response()->json(['success' => true]);


    }

    public function fetchOrdersByUser(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $orders = Order::where('user_id', $request->user_id)
                       ->with('items')  // This will eager load the related order items
                       ->orderBy('created_at','desc')
                       ->get();

        return response()->json([
            'success' => true,
            'orders' => $orders
        ]);
    }


    // public function cancelOrder(Request $request)
    // {
    //     // Validate the incoming request
    //     $request->validate([
    //         'order_id' => 'required',
    //         'cancellation_reason' => 'nullable|string|max:255',
    //     ]);

    //     // Find the order by the provided order_id
    //     $order = Order::find($request->order_id);

    //     if ($order) {
    //         // Update the order status to 'Cancelled'
    //         $order->status = 'Cancelled';

    //         // If there's a cancellation reason, update it
    //         if ($request->has('cancellation_reason')) {
    //             $order->cancellation_reason = $request->cancellation_reason;
    //         }

    //         // Save the changes
    //         $order->save();

    //         return response()->json([
    //             'message' => 'Order has been successfully cancelled.',
    //             'order' => $order
    //         ], 200);
    //     }

    //     // If the order was not found
    //     return response()->json([
    //         'message' => 'Order not found.'
    //     ], 404);
    // }

    public function cancelOrder(Request $request)
{
    // Validate the incoming request
    $request->validate([
        'order_id' => 'required|string',
        'cancellation_reason' => 'nullable|string|max:255',
    ]);

    // Find the order by the 'order_id' attribute
    $order = Order::where('order_id', $request->order_id)->first();

    if ($order) {
        // Update the order status to 'Cancelled'
        $order->status = 'Cancelled';

        // If there's a cancellation reason, update it
        if ($request->has('cancellation_reason')) {
            $order->cancellation_reason = $request->cancellation_reason;
        }

        // Save the changes
        $order->save();

        $user = Auth::user(); 
        $userEmail = $user->email; 

        Log::create([
            'ip_address' => $request->ip(), 
            'email' => $userEmail, 
            'action' => "Customer cancelled the order {$request['order_id']} for the reason {$request['cancellation_reason']}"
        ]);



        return response()->json([
            'message' => 'Order has been successfully cancelled.',
            'order' => $order
        ], 200);
    }

    // If the order was not found
    return response()->json([
        'message' => 'Order not found.'
    ], 404);
}


public function getLatestOrders(){
    $latestOrders = Order::select('id', 'order_id', 'total_amount', 'name', 'phone', 'status', 'created_at')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'order_id' => $order->order_id,
                    'name' => $order->name,
                    'phone' => $order->phone,
                    'status' => $order->status,
                    'total_amount' =>$order->total_amount,
                    'created_at' => $order->created_at->format('M d, Y H:i:s')
                ];
            });

        return response()->json($latestOrders);
}

}
