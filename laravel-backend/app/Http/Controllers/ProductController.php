<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index() {
        return Product::all();
    }

    public function show(Product $product) {
        return $product;
    }

    public function store(Request $req) {
        $data = $req->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'image' => 'nullable|string',
            'category' => 'nullable|string',
            'description' => 'nullable|string',
        ]);
        return Product::create($data);
    }

    public function update(Request $req, Product $product) {
        $data = $req->validate([
            'name' => 'sometimes|string',
            'price' => 'sometimes|numeric',
            'image' => 'nullable|string',
            'category' => 'nullable|string',
            'description' => 'nullable|string',
        ]);
        $product->update($data);
        return $product;
    }

    public function destroy(Product $product) {
        $product->delete();
        return response()->noContent();
    }
}