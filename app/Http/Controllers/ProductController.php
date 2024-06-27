<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductUnit;
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

        if($search) {
            $products->where('products.name', 'like', '%'.$search.'%');
            $products->where('products.code', 'like', '%'.$search.'%', 'or');
        }
        if(preg_match('/^B\d{3,}$/', $search)) $products->where('products.id', 'like', (int)substr($search, 1), 'or');

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
        $barcode = request()->query('barcode');

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
            'barcode' => $barcode
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $shop_id = Auth::user()->shop_id;
        $request->validate([
            'name' => ['required', 'string', 'unique:products,name,NULL,id,shop_id,'.$shop_id],
            'category.id' => ['numeric', 'nullable'],
            'unit.id' => ['numeric', 'nullable'],
            'category.name' => ['string', 'nullable'],
            'unit.name' => ['string', 'nullable'],
            'price' => ['required', 'numeric', 'min:0'],
            'code' => ['string', 'nullable'],
            'description' => ['string', 'nullable']
        ],[
            'name.required' => 'Nama barang wajib diisi',
            'name.unique' => 'Nama barang sudah ada',
            'name.string' => 'Nama barang wajib berupa teks',
            'price.required' => 'Harga wajib diisi',
            'price.numeric' => 'Harga wajib berupa angka',
            'price.min' => 'Harga minimal 0'
            
        ]);

        $shop_id = Auth::user()->shop_id;
        $category_id = $request->category['id'];
        $unit_id = $request->unit['id'];

        if (!$category_id && $request->category['name']) {
            $category = ProductCategory::create([
                'name' => $request->category['name'],
                'shop_id' => $shop_id
            ]); 
            $category_id = $category->id;
        } 

        if (!$unit_id && $request->unit['name']) {
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
            'code' => $request->code,
            'description' => $request->description
        ]);

        return redirect('/products')->with(['success' => 'Berhasil menambah data barang']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        if (!preg_match('/^B\d{3,}$/', $id)) return abort(404);
        $product_id = (int)substr($id, 1);
        $shop_id = Auth::user()->shop_id;

        $category = request()->query('category');
        $unit = request()->query('unit');

        $categories = ProductCategory::query()
            ->where('shop_id', $shop_id);
        $units = ProductUnit::query()
            ->where('shop_id', $shop_id);
        if ($category) $categories->where('name', 'like', '%'.$category.'%');
        if ($unit) $units->where('name', 'like', '%'.$unit.'%');

        $product = Product::with(['category', 'unit'])
            ->where('id', '=', $product_id)
            ->where('shop_id', '=', $shop_id)
            ->first();
        
        if ($product) {
            $product = [
                'id' => $product->id,
                'name' => $product->name,
                'category' => [
                    'id' => $product->category?->id || null,
                    'name' =>  $product->category?->name
                ],
                'unit' => [
                    'id' => $product->unit?->id || null,
                    'name' =>  $product->unit?->name
                ],
                'price' => $product->price,
                'stock' => $product->stock,
                'description' => $product->description,
            ];
        }
        
        return Inertia::render('Product/Detail', [
            'product' => $product,
            'categories' => $categories->take(5)->get(),
            'units' => $units->take(5)->get()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function barcode(Request $request)
    {
        $request->validate(['code' => ['required', 'string']]);
        $barcode = $request->code;
        $product = Product::query()
            ->where('code', '=', $barcode)
            ->first('id');
        if ($product) {
            return redirect('/products/detail/'.sprintf("B-%03d", $product->id));
        }
       
        return redirect('/products/new?barcode='.$barcode)
            ->with(['error' => 'Barang tidak ditemukan, silahkan tambah barang']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if (!preg_match('/^B\d{3,}$/', $id)) return abort(404);
        $product_id = (int)substr($id, 1);
        $shop_id = Auth::user()->shop_id;

        $request->validate([
            'name' => ['required', 'string', 'unique:products,name,NULL,id,shop_id,'.$shop_id.'id,id,'.$id],
            'category.id' => ['numeric', 'nullable'],
            'unit.id' => ['numeric', 'nullable'],
            'category.name' => ['string', 'nullable'],
            'unit.name' => ['string', 'nullable'],
            'price' => ['required', 'numeric', 'min:0'],
            'code' => ['string', 'nullable'],
            'description' => ['string', 'nullable'],
        ],[
            'name.required' => 'Nama barang wajib diisi',
            'name.string' => 'Nama barang wajib berupa teks',
            'price.required' => 'Harga wajib diisi',
            'price.numeric' => 'Harga wajib berupa angka',
            'category.name.string' => 'Kategori wajib berupa teks',
            'unit.name.string' => 'Satuan wajib berupa teks',
            'code.string' => 'Barcode wajib berupa teks',
            'description.string' => 'Deskripsi wajib berupa teks',
        ]);

        $category_id = $request->category['id'];
        $unit_id = $request->unit['id'];

        if (!$category_id && $request->category['name']) {
            $category = ProductCategory::create([
                'name' => $request->category['name'],
                'shop_id' => $shop_id
            ]); 
            $category_id = $category->id;
        } 

        if (!$unit_id && $request->unit['name']) {
            $unit = ProductUnit::create([
                'name' => $request->unit['name'],
                'shop_id' => $shop_id
            ]); 
            $unit_id = $unit->id;
        } 

        Product::query()
            ->where('id', '=', $product_id)
            ->where('shop_id', '=', $shop_id)
            ->update([
                'name' => $request->name,
                'category_id' => $category_id,
                'unit_id' => $unit_id,
                'shop_id' => $shop_id,
                'code' => $request->code,
                'price' => $request->price,
                'description' => $request->description
            ]);
        
        return redirect('/products')->with(['success' => 'Berhasil mengubah data barang']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (!preg_match('/^B\d{3,}$/', $id)) return abort(404);
        $product_id = (int)substr($id, 1);
        $shop_id = Auth::user()->shop_id;

        Product::query()
            ->where('id', '=', $product_id)
            ->where('shop_id', '=', $shop_id)
            ->delete();

        return redirect('/products')->with(['success' => 'Berhasil menghapus data barang']);
    }
}
