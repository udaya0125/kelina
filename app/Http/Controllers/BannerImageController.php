<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BannerImage;
use Illuminate\Support\Facades\Auth;
use App\Models\Log;
use Illuminate\Support\Facades\File;

class BannerImageController extends Controller
{
    //
    public function store(Request $request){
        $request->validate([
            'image' => 'required|image|max:2048',
        ]);

        $image = $request->file('image'); 
        $imageName = time() . '.' . $image->getClientOriginalExtension();

        $image->move(public_path('images'), $imageName); 

        $banner = BannerImage::create([
            'image_path' => 'images/' . $imageName,
        ]);

        $user = Auth::user(); 
        $userEmail = $user->email;

        Log::create([
            'ip_address' => $request->ip(), 
            'email' => $userEmail, 
            'action' => "Uploaded new banner image"
        ]);

        return response()->json(['message' => 'Banner created successfully', 'banner' => $banner], 201);
    }


    public function index(Request $request){
        $banners = BannerImage::all();
        return response()->json($banners);
    }


   
    public function destroy($id)
{
    try {
        // Find the banner by ID
        $banner = BannerImage::findOrFail($id);

        // Full path to the image
        $imagePath = public_path($banner->image_path);

        // Delete the image file if it exists
        if (File::exists($imagePath)) {
            File::delete($imagePath);
        }

        // Delete the database entry
        $banner->delete();

        // Create a log entry for the deletion
        $user = Auth::user();
        Log::create([
            'ip_address' => request()->ip(),
            'email' => $user->email,
            'action' => "Deleted banner image with ID: {$id}"
        ]);

        return response()->json(['message' => 'Banner deleted successfully'], 200);
    } catch (\Exception $e) {
        // Handle potential errors
        return response()->json(['message' => 'Error deleting banner', 'error' => $e->getMessage()], 500);
    }
}

}
