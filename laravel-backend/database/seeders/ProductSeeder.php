<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                "id" => 1,
                "name" => "Basic Tee",
                "price" => 199,
                "description" => "Soft cotton t-shirt perfect for everyday wear.",
                "image" => "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
                "category" => "Apparel"
            ],
            [
                "id" => 2,
                "name" => "Sneaker X",
                "price" => 2499,
                "description" => "Lightweight sneakers built for comfort and style.",
                "image" => "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=600&q=80",
                "category" => "Apparel"
            ],
            [
                "id" => 3,
                "name" => "Denim Jacket",
                "price" => 1499,
                "description" => "Classic denim jacket with modern fit for casual outings.",
                "image" => "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/456090/sub/goods_456090_sub14_3x4.jpg?width=423",
                "category" => "Apparel"
            ],
            [
                "id" => 4,
                "name" => "Smart Watch",
                "price" => 3499,
                "description" => "Track fitness, calls, and notifications with style.",
                "image" => "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRBUWtwxsL4ogJF9FNGeRyAU_oNjRZwkOBMGeAnFYcxBYWla48Gd9SgokB-ZmdL7k0k_WcFOp5v8NFpcKqaLzNvzYA26rpELK78aehK6TWX6im_ZZaxobHkYQ",
                "category" => "Accessories"
            ],
            [
                "id" => 5,
                "name" => "Backpack Pro",
                "price" => 899,
                "description" => "Durable backpack with multiple compartments and laptop sleeve.",
                "image" => "https://www.urbantravellerco.com/cdn/shop/files/alpaka-backpacks-army-green-alpaka-elements-backpack-pro-axoflux-600d-57972591460661_940x.jpg?v=1753861636",
                "category" => "Utilities"
            ],
            [
                "id" => 6,
                "name" => "Wireless Headphones",
                "price" => 1599,
                "description" => "Noise-cancelling wireless headphones for premium sound.",
                "image" => "https://powermaccenter.com/cdn/shop/files/SNYI100BLU012000x2000.jpg?v=1692058747&width=713",
                "category" => "Accessories"
            ],
            [
                "id" => 7,
                "name" => "Leather Wallet",
                "price" => 499,
                "description" => "Premium genuine leather wallet with multiple card slots and coin pocket.",
                "image" => "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRZeLo367VuSjj6mVqm0ddWjeKuzScSxVPu0jhI8Alo2QRzN-4iOG3D-QJooxRoIzi6dJakoPw5HSZhtGvKw3D_wKtQo87mrSC-iQOMcPNeOgvUtEJ9N3XPriu5",
                "category" => "Accessories"
            ],
            [
                "id" => 8,
                "name" => "Travel Mug",
                "price" => 299,
                "description" => "Stainless steel insulated travel mug keeps beverages hot or cold.",
                "image" => "https://www.nespresso.ph/media/catalog/product/t/r/travelmugtouch.png",
                "category" => "Utilities"
            ],
            [
                "id" => 9,
                "name" => "Cargo Brown Shorts",
                "price" => 799,
                "description" => "Casual brown cargo shorts with multiple pockets and comfortable fit.",
                "image" => "https://cdn-images.farfetch-contents.com/23/36/62/53/23366253_53752010_600.jpg",
                "category" => "Apparel"
            ],
            [
                "id" => 10,
                "name" => "Blue Polo Shirt",
                "price" => 699,
                "description" => "Classic blue polo shirt crafted from breathable cotton fabric.",
                "image" => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU3JrQO61BlYLzJGvjZWZ-ngvZuA_Uj9sovA&s",
                "category" => "Apparel"
            ],
            [
                "id" => 11,
                "name" => "Sport Sneakers",
                "price" => 1799,
                "description" => "Performance sneakers designed for maximum comfort and durability.",
                "image" => "https://dynamic.zacdn.com/sUn9BOakqjqlpUvUufLDexYwgGY=/filters:quality(70):format(webp)/https://static-ph.zacdn.com/p/world-balance-0314-7195423-1.jpg",
                "category" => "Apparel"
            ],
            [
                "id" => 12,
                "name" => "Smart Watch Black",
                "price" => 3599,
                "description" => "Sleek black smartwatch with fitness tracking and call notifications.",
                "image" => "https://cdn.mos.cms.futurecdn.net/raw3fhNA9oN7h4FCk6RvmP.jpg",
                "category" => "Accessories"
            ],
            [
                "id" => 13,
                "name" => "Sapphire Diamond Ring",
                "price" => 12999,
                "description" => "Elegant royal blue sapphire and diamond ring handcrafted in London.",
                "image" => "https://www.hirshlondon.com/media/catalog/product/cache/c24ad24c76258badb18cbdcd2c71fdec/t/r/trio-royal-blue-sapphire-and-diamond-ring-hirsh-london-r2631.jpg",
                "category" => "Accessories"
            ],
            [
                "id" => 14,
                "name" => "Brass Compass Keychain",
                "price" => 299,
                "description" => "Compact brass keychain with a built-in magnetic direction compass.",
                "image" => "https://rukminim2.flixcart.com/image/480/640/xif0q/key-chain/i/w/k/brass-magnetic-direction-compass-shoptreed-1-original-imah8hgpxzafx7j6.jpeg?q=20",
                "category" => "Accessories"
            ],
            [
                "id" => 15,
                "name" => "Water Filter Bottle",
                "price" => 649,
                "description" => "Portable water bottle with integrated filter for safe hydration on the go.",
                "image" => "https://www.pbtech.com/pacific/imgprod/W/A/WATAQF0000576__1.jpg",
                "category" => "Utilities"
            ],
            [
                "id" => 16,
                "name" => "Gym Duffel Bag",
                "price" => 1099,
                "description" => "Spacious duffel bag perfect for gym sessions or short trips.",
                "image" => "https://www.urbanathletics.com.ph/cdn/shop/files/436037-A.jpg?v=1711433964",
                "category" => "Utilities"
            ],
            [
                "id" => 17,
                "name" => "Travel Hiking Bag",
                "price" => 1399,
                "description" => "Durable travel and hiking backpack designed for long outdoor adventures.",
                "image" => "https://my-test-11.slatic.net/p/d1363a525383bebbd9adfa46f44d48d0.jpg",
                "category" => "Utilities"
            ],
            [
                "id" => 18,
                "name" => "Swiss Army Knife",
                "price" => 999,
                "description" => "Compact multi-tool Swiss Army knife with essential functions.",
                "image" => "https://www.vkf-renzel.com/out/pictures/generated/product/1/650_650_75/r4004904-01/victorinox-swiss-army-knife-classic-40.0490.4-1.jpg",
                "category" => "Utilities"
            ],
        ];

        foreach ($products as $product) {
            DB::table('products')->updateOrInsert(
                ['id' => $product['id']], // match by ID
                array_merge($product, [
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ])
            );
        }
    }
}
