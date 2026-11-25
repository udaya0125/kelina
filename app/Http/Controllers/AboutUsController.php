<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AboutUs; 
use Illuminate\Http\JsonResponse; 

class AboutUsController extends Controller
{
    //

    public function index():JsonResponse
    {
        $aboutUs = AboutUs::first();


        return response()->json([
            'success' => true, 
            'data' => $aboutUs
        ]);
    }


    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'content' => 'required | string'
        ]); 

        $aboutUs = AboutUs::first(); 

        if ($aboutUs) {
            $aboutUs->update(['content' => $request->content]);
            $message = 'About us updated successfully';
        } else {
            $aboutUs = AboutUs::create(['content' => $request->content]);
            $message = 'About Us content created successfully';
        }

        return response()->json([
            'success' => true, 
            'message' => $message, 
            'data' => $aboutUs
        ]);

    }

}
