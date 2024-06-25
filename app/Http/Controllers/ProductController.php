<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductUnit;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use function Laravel\Prompts\select;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $search = request()->query('search');
        $column = request()->query('col');
        $sort = request()->query('sort');

        $shop_id = Auth::user()->shop_id;

        $products = Product::query()
            ->leftJoin('product_units as u', 'u.id', '=', 'products.unit_id')
            ->leftJoin('product_categories as c', 'c.id', '=', 'products.category_id')
            ->where('products.shop_id', '=', $shop_id);

        if($search) $products->where('products.name', 'like', '%'.$search.'%');
        if(preg_match('/^B\d+$/', $search)) $products->where('products.id', 'like', (int)substr($search, 1), 'or');

        if(in_array($column, ['id', 'name', 'category', 'stock', 'unit', 'price']) && $sort && in_array($sort, ['asc', 'desc'])) {
            if($column === 'category') $products->orderBy('c.name', $sort);
            if($column === 'unit') $products->orderBy('u.name', $sort);
            if(!in_array($column, ['category', 'unit'])) $products->orderBy('products.'.$column, $sort);
        }       
        $products->select('products.id', 'products.name', 'products.price', 'c.name as category', 'u.name as unit', 'products.stock');
        return Inertia::render('Product/Index', [
            'products' => $products->paginate(10),
            'query' => [
                'search' => $search,
                'col' => $column,
                'sort' => $sort
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $category = request()->query('category');
        $unit = request()->query('unit');

        $shop_id = Auth::user()->shop_id;
        $categories = ProductCategory::query()
            ->where('shop_id', $shop_id);
        $units = ProductUnit::query()
            ->where('shop_id', $shop_id);
        if ($category) $categories->where('name', 'like', '%'.$category.'%');
        if ($unit) $units->where('name', 'like', '%'.$unit.'%');

        return Inertia::render('Product/New', [
            'categories' => $categories->take(5)->get(),
            'units' => $units->take(5)->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'unique:products,name'],
            'category.id' => ['numeric'],
            'unit.id' => ['numeric'],
            'category.name' => ['string'],
            'unit.name' => ['string'],
            'price' => ['required', 'numeric'],
            'upc' => ['string'],
            'description' => ['string'],
        ],[
            'name.required' => 'Nama wajib diisi',
            'name.string' => 'Nama wajib berupa teks',
            'price.required' => 'Harga wajib diisi',
            'price.numeric' => 'Harga wajib berupa angka',
            'upc.string' => 'Barcode wajib berupa teks',
            'description.string' => 'Deskripsi wajib berupa teks',
        ]);

        $shop_id = Auth::user()->shop_id;
        $category_id = $request->category['id'];
        $unit_id = $request->unit['id'];

        if ($category_id === 0) {
            $category = ProductCategory::create([
                'name' => $request->category['name'],
                'shop_id' => $shop_id
            ]); 
            $category_id = $category->id;
        } 

        if ($unit_id === 0) {
            $unit = ProductUnit::create([
                'name' => $request->unit['name'],
                'shop_id' => $shop_id
            ]); 
            $unit_id = $unit->id;
        } 

        Product::create([
            'name' => $request->name,
            'category_id' => $category_id,
            'unit_id' => $unit_id,
            'shop_id' => $shop_id,
            'price' => $request->price,
            'description' => $request->description
        ]);

        return redirect('/products');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        if (!preg_match('/^B\d+$/', $id)) return abort(404);
        $product_id = (int)substr($id, 1);
        $shop_id = Auth::user()->shop_id;

        $product = Product::with(['category', 'unit'])
            ->where('id', '=', $product_id)
            ->where('shop_id', '=', $shop_id)
            ->first();
        
        if ($product) {
            $product = [
                'id' => $product->id,
                'name' => $product->name,
                'category' => $product->category?->name,
                'unit' => $product->unit?->name,
                'price' => $product->price,
                'stock' => $product->stock,
                'description' => $product->description,
            ];
        }
        
        return Inertia::render('Product/Detail', [
            'product' => $product,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Product::un
    }
}
