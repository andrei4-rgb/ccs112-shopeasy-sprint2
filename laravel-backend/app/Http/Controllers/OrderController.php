<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index() {
        return Order::with(['product', 'user'])->get();
    }

    public function show(Order $order) {
        return $order->load(['product', 'user']);
    }

    public function store(Request $req) {
        $req->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'payment' => 'required|string|max:255',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.status' => 'required|string',
        ]);

        $user = $req->user();
        $orders = [];

        foreach ($req->items as $item) {
            $product = Product::findOrFail($item['product_id']);
            $total_price = $product->price * $item['quantity'];

            $orders[] = Order::create([
                'product_id'  => $item['product_id'],
                'quantity'    => $item['quantity'],
                'status'      => $item['status'],
                'total_price' => $total_price,
                'customer_id' => $user->id,
                'name'        => $req->input('name'),
                'address'     => $req->input('address'),
                'payment'     => $req->input('payment'),
            ]);
        }

        return response()->json([
            'message' => 'Orders placed successfully',
            'orders'  => $orders,
        ], 201);
    }

    // ✅ Admin-only index
    public function adminIndex() {
        return Order::with(['product', 'user'])->orderByDesc('created_at')->get();
    }

    public function update(Request $req, Order $order) {
        $data = $req->validate([
            'quantity' => 'sometimes|integer|min:1',
            'status'   => 'sometimes|string',
        ]);

        if (isset($data['quantity'])) {
            $data['total_price'] = $order->product->price * $data['quantity'];
        }

        $order->update($data);
        return $order->load(['product', 'user']);
    }

    public function destroy(Order $order) {
        $order->delete();
        return response()->noContent();
    }
}
