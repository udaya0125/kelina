<?php

namespace App\Http\Controllers;

use App\Models\ComplainRecord;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ComplainRecordController extends Controller
{
    /**
     * Write an entry to the activity log.
     */
    private function writeLog(Request $request, string $action): void
    {
        Log::create([
            'ip_address' => $request->ip(),
            'email' => Auth::user()?->email,
            'action' => $action,
        ]);
    }

    /**
     * Display all complain records.
     */
    public function index()
    {
        $complainRecords = ComplainRecord::with('items')
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $complainRecords,
        ]);
    }


    /**
     * Store a new complain record with its items.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_name' => 'required|string|max:255',
            'address' => 'nullable|string|max:255',
            'primary_contact_person' => 'nullable|string|max:255',
            'phone_number' => 'nullable|string|max:50',
            'service_type' => 'nullable|string|max:255',
            'image' => 'nullable|file|mimes:jpg,jpeg,png,webp,gif,pdf|max:5120',
            'technician_name' => 'nullable|string|max:255',
            'note' => 'nullable|string',
            'complain_date' => 'nullable|date',
            'fixed_date' => 'nullable|date',
            'work_status' => 'nullable|string|max:255',

            'items' => 'nullable|array',
            'items.*.item' => 'nullable|string|max:255',
            'items.*.quantity' => 'nullable|numeric|min:0',
            'items.*.rate' => 'nullable|numeric|min:0',
            'items.*.amount' => 'nullable|numeric|min:0',
            'items.*.remarks' => 'nullable|string',
        ]);

        DB::beginTransaction();

        $imagePath = null;

        try {
            // Store uploaded image or PDF
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('complain_records', 'public');
            }

            $complainRecord = ComplainRecord::create([
                'client_name' => $validated['client_name'],
                'address' => $validated['address'] ?? null,
                'primary_contact_person' => $validated['primary_contact_person'] ?? null,
                'phone_number' => $validated['phone_number'] ?? null,
                'service_type' => $validated['service_type'] ?? null,
                'image' => $imagePath,
                'technician_name' => $validated['technician_name'] ?? null,
                'note' => $validated['note'] ?? null,
                'complain_date' => $validated['complain_date'] ?? null,
                'fixed_date' => $validated['fixed_date'] ?? null,
                'work_status' => $validated['work_status'] ?? null,
            ]);

            // Store complain record items
            if (!empty($validated['items'])) {
                foreach ($validated['items'] as $item) {
                    $complainRecord->items()->create([
                        'item' => $item['item'] ?? null,
                        'quantity' => $item['quantity'] ?? null,
                        'rate' => $item['rate'] ?? null,
                        'amount' => $item['amount'] ?? null,
                        'remarks' => $item['remarks'] ?? null,
                    ]);
                }
            }

            $this->writeLog(
                $request,
                "Created complain record for client {$complainRecord->client_name}"
            );

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Complain record created successfully.',
                'data' => $complainRecord->load('items'),
            ], 201);

        } catch (\Throwable $e) {

            DB::rollBack();

            // Remove the uploaded file if saving failed
            if ($imagePath) {
                Storage::disk('public')->delete($imagePath);
            }

            return response()->json([
                'success' => false,
                'message' => 'Failed to create complain record.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Update a complain record with its items.
     */
    public function update(Request $request, $id)
    {
        $complainRecord = ComplainRecord::findOrFail($id);

        $validated = $request->validate([
            'client_name' => 'required|string|max:255',
            'address' => 'nullable|string|max:255',
            'primary_contact_person' => 'nullable|string|max:255',
            'phone_number' => 'nullable|string|max:50',
            'service_type' => 'nullable|string|max:255',
            'image' => 'nullable|file|mimes:jpg,jpeg,png,webp,gif,pdf|max:5120',
            'technician_name' => 'nullable|string|max:255',
            'note' => 'nullable|string',
            'complain_date' => 'nullable|date',
            'fixed_date' => 'nullable|date',
            'work_status' => 'nullable|string|max:255',

            'items' => 'nullable|array',
            'items.*.item' => 'nullable|string|max:255',
            'items.*.quantity' => 'nullable|numeric|min:0',
            'items.*.rate' => 'nullable|numeric|min:0',
            'items.*.amount' => 'nullable|numeric|min:0',
            'items.*.remarks' => 'nullable|string',
        ]);

        DB::beginTransaction();

        $newImagePath = null;
        $oldImagePath = $complainRecord->image;

        try {
            $data = [
                'client_name' => $validated['client_name'],
                'address' => $validated['address'] ?? null,
                'primary_contact_person' => $validated['primary_contact_person'] ?? null,
                'phone_number' => $validated['phone_number'] ?? null,
                'service_type' => $validated['service_type'] ?? null,
                'technician_name' => $validated['technician_name'] ?? null,
                'note' => $validated['note'] ?? null,
                'complain_date' => $validated['complain_date'] ?? null,
                'fixed_date' => $validated['fixed_date'] ?? null,
                'work_status' => $validated['work_status'] ?? null,
            ];

            // Only replace the file when a new one is uploaded
            if ($request->hasFile('image')) {
                $newImagePath = $request->file('image')->store('complain_records', 'public');
                $data['image'] = $newImagePath;
            }

            $complainRecord->update($data);

            /*
             * Delete old items and recreate them.
             *
             * This is simple and works well when the frontend
             * sends the complete items array during update.
             */
            $complainRecord->items()->delete();

            if (!empty($validated['items'])) {
                foreach ($validated['items'] as $item) {
                    $complainRecord->items()->create([
                        'item' => $item['item'] ?? null,
                        'quantity' => $item['quantity'] ?? null,
                        'rate' => $item['rate'] ?? null,
                        'amount' => $item['amount'] ?? null,
                        'remarks' => $item['remarks'] ?? null,
                    ]);
                }
            }

            $this->writeLog(
                $request,
                "Updated complain record for client {$complainRecord->client_name}"
            );

            DB::commit();

            // Delete the old file only after everything succeeded
            if ($newImagePath && $oldImagePath) {
                Storage::disk('public')->delete($oldImagePath);
            }

            return response()->json([
                'success' => true,
                'message' => 'Complain record updated successfully.',
                'data' => $complainRecord->load('items'),
            ]);

        } catch (\Throwable $e) {

            DB::rollBack();

            // Remove the newly uploaded file if the update failed
            if ($newImagePath) {
                Storage::disk('public')->delete($newImagePath);
            }

            return response()->json([
                'success' => false,
                'message' => 'Failed to update complain record.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Update only the work status of a complain record.
     * Used by the inline status dropdown in the admin table.
     */
    public function updateStatus(Request $request, $id)
    {
        $complainRecord = ComplainRecord::findOrFail($id);

        $validated = $request->validate([
            'work_status' => 'required|string|in:Pending,In Progress,Completed',
        ]);

        $oldStatus = $complainRecord->work_status;

        $complainRecord->update([
            'work_status' => $validated['work_status'],
        ]);

        $this->writeLog(
            $request,
            "Changed work status of complain record for client {$complainRecord->client_name} from "
            . ($oldStatus ?? 'none') . " to {$validated['work_status']}"
        );

        return response()->json([
            'success' => true,
            'message' => 'Work status updated successfully.',
            'data' => $complainRecord->load('items'),
        ]);
    }


    /**
     * Delete a complain record and its items.
     */
    public function destroy(Request $request, $id)
    {
        $complainRecord = ComplainRecord::findOrFail($id);

        DB::beginTransaction();

        try {
            $imagePath = $complainRecord->image;
            $clientName = $complainRecord->client_name;

            // Delete related items first
            $complainRecord->items()->delete();

            // Delete the main complain record
            $complainRecord->delete();

            $this->writeLog(
                $request,
                "Deleted complain record for client {$clientName}"
            );

            DB::commit();

            // Delete the file after the record is gone
            if ($imagePath) {
                Storage::disk('public')->delete($imagePath);
            }

            return response()->json([
                'success' => true,
                'message' => 'Complain record deleted successfully.',
            ]);

        } catch (\Throwable $e) {

            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete complain record.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}