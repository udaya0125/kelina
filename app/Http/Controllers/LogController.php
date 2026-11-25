<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Log; 
class LogController extends Controller
{
    //
    public function index() {
        $logdata = Log::orderby('created_at', 'desc')->get(); 
        return response()->json($logdata);
    }
}
