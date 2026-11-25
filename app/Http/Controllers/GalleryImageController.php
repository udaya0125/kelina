<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GalleryImage;
use Illuminate\Support\Facades\Auth;
use App\Models\Log;
use Illuminate\Support\Facades\File;

class GalleryImageController extends Controller
{
    //
    public function store(Request $request){
        $request->validate([
            'image' => 'required|image|max:2048',
        ]);

        $image = $request->file('image'); 
        $imageName = time() . '.' . $image->getClientOriginalExtension();

        $image->move(public_path('images'), $imageName); 

        $gallery = GalleryImage::create([
            'image_path' => 'images/' . $imageName,
        ]);

        $user = Auth::user(); 
        $userEmail = $user->email;

        Log::create([
            'ip_address' => $request->ip(), 
            'email' => $userEmail, 
            'action' => "Uploaded new gallery image"
        ]);

        return response()->json(['message' => 'Gallery created successfully', 'gallery' => $gallery], 201);
    }


    public function index(Request $request){
        $banners = GalleryImage::all();
        return response()->json($banners);
    }


   
    public function destroy($id)
{
    try {
        // Find the gallery by ID
        $gallery = GalleryImage::findOrFail($id);

        // Full path to the image
        $imagePath = public_path($gallery->image_path);

        // Delete the image file if it exists
        if (File::exists($imagePath)) {
            File::delete($imagePath);
        }

        // Delete the database entry
        $gallery->delete();

        // Create a log entry for the deletion
        $user = Auth::user();
        Log::create([
            'ip_address' => request()->ip(),
            'email' => $user->email,
            'action' => "Deleted gallery image with ID: {$id}"
        ]);

        return response()->json(['message' => 'Gallery deleted successfully'], 200);
    } catch (\Exception $e) {
        // Handle potential errors
        return response()->json(['message' => 'Error deleting gallery', 'error' => $e->getMessage()], 500);
    }
}

}

