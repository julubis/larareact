import { Add, Back, Save, Trash } from "@/Components/Icons";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler, ReactNode, useState } from "react";
import { PageProps } from "@/types";
import AuthLayout from "@/Layouts/AuthLayout";
import Table from "@/Components/Table";

interface Product {
    id: number,
    name: string,
    price: number | string,
    quantity: number | string
}

export default function New({ auth }: PageProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        date: '',
        distributor_id: '',
        products: [],
    });

    const [product, setProduct] = useState<Product>({
        id: 0,
        name: '',
        price: '0',
        quantity: '0'
    })
    const [productList, setProductList] = useState<Product[]>([]);

    const addProduct = () => {
        let isUpdate = false
        const newList = [...productList]
        for (let i = 0; i < newList.length; i++) {
            if (newList[i].name === product.name) {
                newList[i].name = product.name
                newList[i].price = product.price
                newList[i].quantity = product.quantity
                isUpdate = true
            }
        }
        if (!isUpdate) return setProductList([...productList, product]);
        setProductList([...newList]);
    }

    const deleteProduct = (name: string) => {
        const newList = [...productList]
        productList.forEach((list, i) => {
            if (list.name === name) newList.splice(i, 1);
        })
        setProductList(newList)
    }

    const addProductHandle: FormEventHandler = (e) => {
        e.preventDefault();
        addProduct();
        setProduct({
            id: 0,
            name: '',
            price: '',
            quantity: ''
        })
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('distributors.add'));
    };

    return (
        <AuthLayout user={auth.user}>
            <h2 className="font-semibold text-gray-800 text-2xl mb-6 pt-3">Tambah Barang Masuk</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex w-full flex-col gap-3 bg-white p-4 rounded-md">
                    <div className="w-full">
                        <p className="text-xl font-medium mb-2">Informasi Transaksi</p>
                        <hr className="border border-gray-200"/>
                    </div>
                    <div className="w-full">
                        <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900 after:content-['*'] after:text-red-500">Tanggal</label>
                        <input value={data.date} onChange={(e) => setData('date', e.target.value)}  type="date" name="date" className="w-full rounded-md" autoFocus required />
                    </div>
                    <div className="w-full mb-3">
                        <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900 after:content-['*'] after:text-red-500">Distributor</label>
                        <input value={data.distributor_id} onChange={(e) => setData('distributor_id', e.target.value)} type="text" name="price" className="w-full rounded-md" required />
                    </div>
                    <div className="sm:col-span-2 md:col-span-3">
                        <p className="text-xl font-medium mb-2">Data Barang</p>
                        <hr className="border border-gray-200"/>
                    </div>
                    <form onSubmit={addProductHandle} className="space-y-2">
                        <div className="w-full">
                            <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900 after:content-['*'] after:text-red-500">Nama Barang</label>
                            <input value={product.name} onChange={(e) => setProduct({...product, name: e.target.value.trim()})} type="text" name="name" className="w-full rounded-md" required />
                        </div>
                        <div className="w-full">
                            <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900 after:content-['*'] after:text-red-500">Harga Beli</label>
                            <input value={product.price} onChange={(e) => setProduct({...product, price: e.target.value.trim()})} type="number" name="price" className="w-full rounded-md" required />
                        </div>
                        <div className="w-full mb-3">
                            <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900 after:content-['*'] after:text-red-500">Jumlah</label>
                            <input value={product.quantity} onChange={(e) => setProduct({...product, quantity: e.target.value.trim()})} type="number" name="quantity" className="w-full rounded-md" required />
                        </div>
                        <div className="w-full">
                            <button type="submit" className="w-full btn-md justify-center flex gap-2 rounded-md bg-primary-500 hover:bg-primary-600 text-white shadow-md focus:ring-primary-200"><Add className="w-5 h-5"/> Tambah</button>
                        </div>
                    </form>
                    
                    
                </div>
                <div className="flex flex-col bg-white p-4 rounded-md md:col-span-2">
                    <div className="w-full mb-2">
                        <p className="text-xl font-medium mb-2">Daftar Barang Masuk</p>
                        <hr className="border border-gray-200"/>
                    </div>
                    <div className="w-full">
                        <Table 
                            header={[{label: 'Nama Barang'}, {label: 'Jumlah'}, {label: 'Harga'}, {label: 'Total Harga'}, {label: ''}]}
                            body={productList.map(list => [
                                list.name,
                                list.quantity,
                                Number(list.price).toLocaleString('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0}),
                                (Number(list.price) * Number(list.quantity)).toLocaleString('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0}),
                                <button className="text-red-500" onClick={() => deleteProduct(list.name)}><Trash className="w-5 h-5"/></button>
                            ])}
                        ></Table>
                    </div>
                    <div className="">
                        {productList.length > 1 && <button type="submit" className="btn-md justify-center flex gap-2 rounded-md bg-primary-500 hover:bg-primary-600 text-white shadow-md focus:ring-primary-200"><Save className="w-5 h-5"/>Simpan</button>}
                    </div>
                    
                </div>
            </div>
            
        </AuthLayout>
    )
}