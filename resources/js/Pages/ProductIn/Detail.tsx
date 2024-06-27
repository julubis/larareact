import { Back, Pencil, Save, Trash } from "@/Components/Icons";
import Table from "@/Components/Table";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";

interface ProductIn {
    id: number,
    distributor: string,
    date: string,
    total_price: number,
    products: {
        name: string,
        quantity: number,
        price: number,
        total_price: number
    }[]
}

export default function Detail({ auth, productIn }: PageProps & {productIn: ProductIn}) {
    const dataTable = productIn.products.map(product => [
        product.name, 
        product.quantity, 
        product.price.toLocaleString('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0}), 
        product.total_price.toLocaleString('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0})
    ]);
    dataTable.push(['', '', 'Jumlah', `${productIn.products.reduce((sum, item) => sum + item.total_price, 0).toLocaleString('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0})}`])

    return (
        <AuthLayout user={auth.user}>
            <h2 className="font-semibold text-gray-800 text-2xl mb-6">Detail Barang Masuk</h2>
            <div className="p-4 bg-white rounded-lg grid grid-cols-2 text-base font-medium gap-x-3 w-fit mb-3">
                <p>ID Transaksi</p>
                <p>: {`BM${productIn.id.toString().padStart(3, '0')}`}</p>
                <p>Tanggal</p>
                <p>: {new Date(productIn.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
                <p>Nama Distributor</p>
                <p>: {productIn.distributor}</p>
            </div>
            <Table 
                    header={[{label: 'Nama Barang'}, {label: 'Jumlah'}, {'label': 'Harga'}, {label: 'Total Harga'}]}
                    body={dataTable}
                />
            
        </AuthLayout>
    )
}