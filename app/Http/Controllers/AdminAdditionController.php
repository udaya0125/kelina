<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Str; 
use Illuminate\Support\Facades\Auth;  
use App\Models\Log;

class AdminAdditionController extends Controller
{
    //
    public function store(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string',
        ]);
        
        $user = Auth::user(); 
        $userEmail = $user->email; 

        Log::create([
            'ip_address' => $request->ip(), 
            'email' => $userEmail, 
            'action' => "Created new admin {$validated['name']} {$validated['email']}"
        ]);


        // Create the user
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']), // Hash the password
            'role' => 'admin',
            'email_verified_at' => now(), // Mark email as verified
            'remember_token' => Str::random(10), // Generate a random remember token
        ]);

        // Return a JSON response
        return response()->json(['message' => 'Admin created successfully', 'user' => $user]);
    }

    public function index() {
        $admins = User::where('role', 'admin')->get(); 

        return response()->json($admins);
    }

    public function destroy(Request $request)
    {   
        $request->validate([
            'id' => 'required|integer|exists:users,id'
        ]);

        try {
            $user = User::findOrFail($request->id);
            $user->delete();


            $user = Auth::user(); 
            $userEmail = $user->email; 
            Log::create([
                'ip_address' => $request->ip(), 
                'email' => $userEmail, 
                'action' => "Deleted the admin {$user['name']}"
            ]);


            return response()->json(['message' => 'User deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal server error'], 500);
        }
    }



}
