<!-- resources/views/emails/new-order-notification.blade.php -->
<!DOCTYPE html>
<html>
<head>
    <title>New Order Notification</title>
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
        .customer-info {
            background-color: #f8f9fa;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 4px;
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
        <h1>New Order Received</h1>
        <p>Order #{{ $orderData['order']->order_id }}</p>
    </div>
    
    <div class="content">
        <div class="customer-info">
            <h2>Customer Information</h2>
            <p><strong>Name:</strong> {{ $orderData['customer']['name'] }}</p>
            <p><strong>Email:</strong> {{ $orderData['customer']['email'] }}</p>
            <p><strong>Phone:</strong> {{ $orderData['customer']['phone'] }}</p>
            <p><strong>Address:</strong> {{ $orderData['customer']['address'] }}</p>
        </div>
        
        <div class="order-details">
            <h2>Order Details</h2>
            <p><strong>Order Date:</strong> {{ $orderData['order']->created_at->format('F j, Y g:i A') }}</p>
            <p><strong>Payment Method:</strong> {{ $orderData['order']->payment_method }}</p>
            <p><strong>Status:</strong> {{ $orderData['order']->status }}</p>
            
            @if($orderData['order']->instruction)
            <h3>Special Instructions</h3>
            <p>{{ $orderData['order']->instruction }}</p>
            @endif
        </div>
        
        <h2>Order Items</h2>
        <table class="order-items">
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                @foreach($orderData['items'] as $item)
                <tr>
                    <td>{{ $item->product_id }}</td>
                    <td>{{ $item->item_name }}</td>
                    <td>Rs. {{ number_format($item->product_price, 2) }}</td>
                    <td>{{ $item->quantity }}</td>
                    <td>Rs. {{ number_format($item->product_price * $item->quantity, 2) }}</td>
                </tr>
                @endforeach
                
                @if($orderData['order']->discount_amount > 0)
                <tr>
                    <td colspan="4">Discount ({{ $orderData['order']->coupon_code }})</td>
                    <td>-${{ number_format($orderData['order']->discount_amount, 2) }}</td>
                </tr>
                @endif
                
                <tr class="total-row">
                    <td colspan="4">Total ({{ $orderData['order']->total_quantity }} items)</td>
                    <td>Rs. {{ number_format($orderData['order']->total_amount, 2) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <div class="footer">
        <p>&copy; {{ date('Y') }} Kelina International. All rights reserved.</p>
    </div>
</body>
</html>