<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    //

    public function create(): Response
    {
        // return Inertia::render('Auth/Register');
        return Inertia::render('Admin/AdminUser'); 
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */


    public function store(Request $request)
    {
        

            try {

                $request->validate([
                    'name' => 'required|string|max:255',
                    'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
                    'password' => ['required'],
                ]);
        
                $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                    'role' => 'admin',
                ]);
        
                event(new Registered($user));
        
                Auth::login($user);
        
                return response()->json('Admin registered successfully');

            } catch (\Exception $e) {
                //throw $th;
                \Log::error('Admin registration failed: ' . $e->getMessage());
                 return response()->json('Could not register the user');
            }

    }

    public function loginForm(): Response
    {
        return Inertia::render('Auth/AdminLogin');
    }

    /**
     * Handle an admin login request.
     */
    // public function login(Request $request)
    // {
    //     $credentials = $request->validate([
    //         'email' => ['required', 'email'],
    //         'password' => ['required'],
    //     ]);

    //     if (Auth::attempt($credentials)) {
    //         $user = Auth::user();
    //         if ($user->isAdmin()) {
    //             $request->session()->regenerate();
    //             return redirect()->intended(route('saitadmin.dashboard'));
    //         }
            
    //         // If not admin, logout and return with error
    //         Auth::logout();
    //         return back()->withErrors([
    //             'email' => 'These credentials do not have admin access.',
    //         ]);
    //     }

    //     return back()->withErrors([
    //         'email' => 'The provided credentials do not match our records.',
    //     ]);
    // }

    

    public function login(Request $request)
{
    $credentials = $request->validate([
        'name' => ['required'], // Change 'email' to 'username'
        'password' => ['required'],
    ]);

    // Use the username to attempt authentication
    if (Auth::attempt(['name' => $credentials['name'], 'password' => $credentials['password']])) {
        $user = Auth::user();
        if ($user->isAdmin()) {
            $request->session()->regenerate();
            return redirect()->intended(route('saitadmin.dashboard'));
        }
        
        // If not admin, logout and return with error
        Auth::logout();
        return back()->withErrors([
            'username' => 'These credentials do not have admin access.',
        ]);
    }

    return back()->withErrors([
        'username' => 'The provided credentials do not match our records.',
    ]);
}



    public function getAdmins() {
        $admins = User::where('role', 'admin')->get(); 

        return response()->json($admins);
    }

    public function destroy(Request $request) 
    {
        $user = User::findOrFail($request->id); 

        $user->delete(); 

        return response()->json('User deleted successfully',200);
    }


    public function logout(Request $request) 
    {
        Auth::guard('web')->logout(); 

        $request->session()->invalidate(); 
        $request->session()->regenerateToken(); 

        return redirect()->route('admin.login'); 
        $request->session()->flush();
    }

}




// public function store(Request $request): RedirectResponse
//     {
//         $request->validate([
//             'name' => 'required|string|max:255',
//             'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
//             'password' => ['required'],
//         ]);

//         $user = User::create([
//             'name' => $request->name,
//             'email' => $request->email,
//             'password' => Hash::make($request->password),
//             'role' => 'admin',
//         ]);

//         event(new Registered($user));

//         Auth::login($user);

//         return redirect(route('saitadmin.dashboard', absolute: false));
//    }