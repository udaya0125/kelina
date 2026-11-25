<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;



class EmployeeDataController extends Controller
{
    //

    public function index()
    {
        return response()->json(Employee::all(), 200);
    }

    // Store a new employee
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048', 
            'phone_number' => 'nullable'
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
            $imagePath = 'images/' . $imageName;
        }

        $employee = Employee::create([
            'name' => $request->name,
            'designation' => $request->designation,
            'image' => $imagePath,
            'phone_number' => $request->phone_number,
        ]);

        return response()->json($employee, 201);
    }

    // Show a single employee
    public function show($id)
    {
        $employee = Employee::findOrFail($id);
        return response()->json($employee, 200);
    }

    // Update an employee
    public function update(Request $request, $id)
    {

        \Log::info('Request data:', $request->all());
        \Log::info('Request files:', $request->allFiles());

        if ($request->has('name') && $request->has('designation')) {
            \Log::info('Specific request fields:', [
                'name' => $request->input('name'),
                'designation' => $request->input('designation'),
            ]);
        } else {
            \Log::info('Specific request fields not found.');
        }

        $employee = Employee::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048', 
            'phone_number' => 'nullable'
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($employee->image && File::exists(public_path($employee->image))) {
                File::delete(public_path($employee->image));
            }

            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
            $employee->image = 'images/' . $imageName;
        }

        $employee->name = $request->name;
        $employee->designation = $request->designation;
        $employee->phone_number = $request->phone_number;
        $employee->save();

        return response()->json($employee, 200);
    }

    // Delete an employee
    public function destroy($id)
    {
        $employee = Employee::findOrFail($id);

        // Delete image from storage if exists
        if ($employee->image && File::exists(public_path($employee->image))) {
            File::delete(public_path($employee->image));
        }

        $employee->delete();

        return response()->json(['message' => 'Employee deleted successfully'], 200);
    }

}
