<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // 👀 Public: List all products
    public function index()
    {
        // Return all products including category string
        return response()->json(Product::orderBy('name')->get(), 200);
    }

    // 👀 Public: Show single product
    public function show(Product $product)
    {
        return response()->json($product, 200);
    }

    // 🛠️ Admin: Create product
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => 'required|string',
            'price'       => 'required|numeric',
            'image'       => 'nullable|string',
            'category'    => 'nullable|string',   // ✅ now using string category
            'description' => 'nullable|string',
            'stock'       => 'nullable|integer',
        ]);

        $product = Product::create($data);
        return response()->json($product, 201);
    }

    // 🛠️ Admin: Update product
    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name'        => 'sometimes|string',
            'price'       => 'sometimes|numeric',
            'image'       => 'nullable|string',
            'category'    => 'nullable|string',   // ✅ string category
            'description' => 'nullable|string',
            'stock'       => 'nullable|integer',
        ]);

        $product->update($data);
        return response()->json($product, 200);
    }

    // 🗑️ Admin: Delete product
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Product deleted'], 204);
    }
}
