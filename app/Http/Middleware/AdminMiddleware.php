<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        if (auth()->check() && auth()->user()->isAdmin()){
            return $next($request);
        }

        //
        if(auth()->check()) {
            auth()->logout();
        }

        // return redirect('login')->with('error', 'You do not have admin access');

        return redirect()->route('admin.login')->with('error', 'You do not have admin access');

        
            // if (!Auth::check()) {
            //     // If the user is not logged in, redirect to admin login
            //     return redirect()->route('admin.login');
            // }
    
            // if (!Auth::user()->isAdmin()) {
            //     // If the user is logged in but not an admin, log them out and redirect to admin login
            //     Auth::logout();
            //     return redirect()->route('admin.login')->with('error', 'You do not have admin access.');
            // }
    
            // return $next($request);
        
    }
}
