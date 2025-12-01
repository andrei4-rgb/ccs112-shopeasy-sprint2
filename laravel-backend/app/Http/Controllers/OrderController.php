<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index() {
        return Order::with('product')->get();
    }

    public function show(Order $order) {
        return $order->load('product');
    }

    public function store(Request $req) {
        $data = $req->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'customer_name' => 'required|string',
            'customer_email' => 'required|email',
        ]);

        $product = Product::findOrFail($data['product_id']);
        $data['total_price'] = $product->price * $data['quantity'];

        $order = Order::create($data);
        return $order->load('product');
    }

    public function update(Request $req, Order $order) {
        $data = $req->validate([
            'quantity' => 'sometimes|integer|min:1',
            'customer_name' => 'sometimes|string',
            'customer_email' => 'sometimes|email',
        ]);

        if (isset($data['quantity'])) {
            $data['total_price'] = $order->product->price * $data['quantity'];
        }

        $order->update($data);
        return $order->load('product');
    }

    public function destroy(Order $order) {
        $order->delete();
        return response()->noContent();
    }
}
