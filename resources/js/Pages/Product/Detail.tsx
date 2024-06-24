import { Back, Save } from "@/Components/Icons";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";

interface Product {
    id?: number
    name?: string
    category?: string
    stock?: number
    unit?: string
    price?: number
    description?: string
}

export default function Detail({ auth, product }: PageProps & {product: Product}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        category: '',
        unit: '',
        price: '',
        upc: '',
        description: ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('products.add'));
    };

    return (
        <AuthLayout user={auth.user}>
            <h2 className="font-semibold text-gray-800 text-2xl mb-6">Detail Barang</h2>
            <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4 bg-white p-4 rounded-md">
                <div className="max-w-screen-sm">
                    <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900 after:content-['*'] after:text-red-500">Nama Barang</label>
                    <div className="w-full rounded-md text-sm border border-gray-300 p-2">{product?.name}</div>
                </div>
                <div className="max-w-screen-sm">
                    <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900 after:content-['*'] after:text-red-500">Kategori</label>
                    <div className="w-full rounded-md text-sm border border-gray-300 p-2">{product?.category}</div>
                    {/* <input readOnly value={product.category_id} type="text" name="category" className="w-full rounded-md" /> */}
                </div>
                <div className="max-w-screen-sm">
                    <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900 after:content-['*'] after:text-red-500">Satuan</label>
                    <div className="w-full rounded-md text-sm border border-gray-300 p-2">{product?.unit}</div>
                    
                    {/* <input value={product.unit_id} type="text" name="unit" className="w-full rounded-md" /> */}
                </div>
                <div className="max-w-screen-sm">
                    <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900 after:content-['*'] after:text-red-500">Harga</label>
                    <div className="w-full rounded-md text-sm border border-gray-300 p-2">{product?.price?.toLocaleString('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0})}</div>
                    {/* <input value={product.price} type="number" name="price" className="w-full rounded-md" /> */}
                </div>
                <div className="max-w-screen-sm">
                    <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900">UPC</label>
                    <input type="text" name="upc" className="w-full rounded-md" />
                </div>
                <div className="max-w-screen-sm">
                    <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900 after:content-['*'] after:text-red-500">Stok</label>
                    <div className="w-full rounded-md text-sm border border-gray-300 p-2">{product?.stock}</div>
                    {/* <input readOnly value={product.category_id} type="text" name="category" className="w-full rounded-md" /> */}
                </div>
                <div className="max-w-screen-sm sm:col-span-2">
                    <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900">Deskripsi</label>
                    <div className="w-full rounded-md text-sm border border-gray-300 p-2">{product?.description}</div>
                    {/* <textarea value={product.description} name="description" className="w-full rounded-md bg-gray-50 border border-gray-300" ></textarea> */}
                </div>
                <div className="max-w-screen-sm sm:col-span-3 flex gap-2">
                    <Link href="/products" className="flex gap-2 mb-2 text-black border border-gray-300 bg-white hover:text-white hover:bg-primary-500 focus:ring focus:outline-none focus:border-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center"><Back className="w-5 h-5"/>Kembali</Link>
                    <button type="submit" className="flex gap-2 mb-2 text-white bg-primary-500 hover:bg-primary-600 focus:ring focus:outline-none focus:border-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center disabled:cursor-not-allowed disabled:bg-primary-400"><Save className="w-5 h-5"/> Simpan</button>
                </div>
                
            </form>
        </AuthLayout>
    )
}