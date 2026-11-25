<!-- resources/views/emails/order-confirmation.blade.php -->
<!DOCTYPE html>
<html>
<head>
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
        }
        .header {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-bottom: 2px solid #dee2e6;
        }
        .content {
            padding: 20px;
        }
        .order-details {
            margin-bottom: 20px;
        }
        .order-items {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .order-items th, .order-items td {
            border: 1px solid #dee2e6;
            padding: 8px;
            text-align: left;
        }
        .order-items th {
            background-color: #f8f9fa;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 0.8em;
            color: #6c757d;
            border-top: 1px solid #dee2e6;
        }
        .total-row {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Thank You for Your Order!</h1>
        <p>Order #{{ $orderData['order']->order_id }}</p>
    </div>
    
    <div class="content">
        <div class="order-details">
            <h2>Order Details</h2>
            <p><strong>Order Date:</strong> {{ $orderData['order']->created_at->format('F j, Y') }}</p>
            <p><strong>Payment Method:</strong> {{ $orderData['order']->payment_method }}</p>
            <p><strong>Status:</strong> {{ $orderData['order']->status }}</p>
            
            <h3>Shipping Information</h3>
            <p>{{ $orderData['customer']['name'] }}</p>
            <p>{{ $orderData['customer']['address'] }}</p>
            <p>Phone: {{ $orderData['customer']['phone'] }}</p>
            <p>Email: {{ $orderData['customer']['email'] }}</p>
            
            @if($orderData['order']->instruction)
            <h3>Special Instructions</h3>
            <p>{{ $orderData['order']->instruction }}</p>
            @endif
        </div>
        
        <h2>Order Summary</h2>
        <table class="order-items">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                @foreach($orderData['items'] as $item)
                <tr>
                    <td>{{ $item->item_name }}</td>
                    <td>{{ $item->quantity }}</td>
                    <td>{{ number_format($item->product_price, 2) }}</td>
                    <td>{{ number_format($item->product_price * $item->quantity, 2) }}</td>
                </tr>
                @endforeach
                
                @if($orderData['order']->discount_amount > 0)
                <tr>
                    <td colspan="3">Discount ({{ $orderData['order']->coupon_code }})</td>
                    <td>{{ number_format($orderData['order']->discount_amount, 2) }}</td>
                </tr>
                @endif
                
                <tr class="total-row">
                    <td colspan="3">Total</td>
                    <td>{{ number_format($orderData['order']->total_amount, 2) }}</td>
                </tr>
            </tbody>
        </table>
        
        <p>Thank you for shopping with us! If you have any questions about your order, please contact our customer service.</p>
    </div>
    
    <div class="footer">
        <p>&copy; {{ date('Y') }} Kelina International. All rights reserved.</p>
    </div>
</body>
</html>