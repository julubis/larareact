<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'shop_id',
        'unit_id',
        'category_id',
    ];
    protected $hidden = [
        'shop_id',
    ];
    public function category()
    {
        return $this->belongsTo(ProductCategory::class);
    }
    public function unit()
    {
        return $this->belongsTo(ProductUnit::class);
    }
}
