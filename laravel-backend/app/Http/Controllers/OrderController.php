<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index() {
        // Return all orders with their related product and customer
        return Order::with(['product', 'customer'])->get();
    }

    public function show(Order $order) {
        // Return a single order with its related product and customer
        return $order->load(['product', 'customer']);
    }

    public function store(Request $req) {
        $data = $req->validate([
            'customer_id' => 'required|exists:customers,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'status' => 'required|string',
        ]);

        $product = Product::findOrFail($data['product_id']);
        $data['total_price'] = $product->price * $data['quantity'];

        $order = Order::create($data);
        return $order->load(['product', 'customer']);
    }

    public function update(Request $req, Order $order) {
        $data = $req->validate([
            'quantity' => 'sometimes|integer|min:1',
            'status' => 'sometimes|string',
        ]);

        if (isset($data['quantity'])) {
            $data['total_price'] = $order->product->price * $data['quantity'];
        }

        $order->update($data);
        return $order->load(['product', 'customer']);
    }

    public function destroy(Order $order) {
        $order->delete();
        return response()->noContent();
    }
}
