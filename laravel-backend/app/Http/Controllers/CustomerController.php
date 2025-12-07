<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller {
    public function index() {
        return Customer::all();
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers,email',
            'phone' => 'nullable|string|max:20',
        ]);

        return response()->json(Customer::create($validated), 201);
    }

    public function show(Customer $customer) {
        return $customer;
    }

    public function update(Request $request, Customer $customer) {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:customers,email,' . $customer->id,
            'phone' => 'nullable|string|max:20',
        ]);

        $customer->update($validated);
        return $customer;
    }

    public function destroy(Customer $customer) {
        $customer->delete();
        return response()->json(['message' => 'Customer deleted']);
    }
}
