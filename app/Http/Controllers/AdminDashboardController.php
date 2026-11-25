<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order; 
use Carbon\Carbon; 

class AdminDashboardController extends Controller
{
    //
    public function getStatistics(Request $request)
    {
        $period = $request->input('period', 'all');
        $now = Carbon::now();

        $query = Order::where('status', 'Delivered');

        switch ($period) {
            case 'daily':
                $query->whereDate('created_at', $now);
                break;
            case 'weekly':
                $query->whereBetween('created_at', [$now->startOfWeek(), $now->endOfWeek()]);
                break;
            case 'monthly':
                $query->whereMonth('created_at', $now->month)->whereYear('created_at', $now->year);
                break;
            // 'all' doesn't need any date filtering
        }

        $totalSales = $query->sum('total_amount');
        $totalOrders = $query->count();

        // Get data for the last week and last month
        $lastWeekSales = Order::where('status', 'Delivered')
            ->whereBetween('created_at', [$now->copy()->subWeek(), $now])
            ->sum('total_amount');

        $lastMonthSales = Order::where('status', 'Delivered')
            ->whereBetween('created_at', [$now->copy()->subMonth(), $now])
            ->sum('total_amount');

        return response()->json([
            'totalSales' => $totalSales,
            'totalOrders' => $totalOrders,
            'lastWeekSales' => $lastWeekSales,
            'lastMonthSales' => $lastMonthSales,
        ]);
    }

    public function getMonthlySalesData()
{
    // Get the current date
    $currentDate = Carbon::now();

    // Array to hold the monthly data
    $monthlyData = [];

    // Loop through the last 12 months
    for ($i = 0; $i < 12; $i++) {
        // Get the first and last day of the month
        $startOfMonth = $currentDate->copy()->subMonths($i)->startOfMonth();
        $endOfMonth = $currentDate->copy()->subMonths($i)->endOfMonth();

        // Get the sales data for the month
        $salesData = Order::where('status', 'Delivered')
            ->whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->selectRaw('SUM(total_amount) as salesAmount, COUNT(*) as orderNumber')
            ->first();

        // Push the data for the current month into the array
        $monthlyData[] = [
            'month' => $startOfMonth->format('F'),
            'salesAmount' => $salesData->salesAmount ?? 0,
            'orderNumber' => $salesData->orderNumber ?? 0,
        ];
    }

    // Return the data in reverse order (latest month first)
    return array_reverse($monthlyData);
}


}
