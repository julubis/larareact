import { Back, Pencil, Save, Trash } from "@/Components/Icons";
import Table from "@/Components/Table";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";

interface ProductOut {
    id: number,
    date: string,
    total_price: number,
    products: {
        name: string,
        quantity: number,
        price: number,
        total_price: number
    }[]
}

export default function Detail({ auth, productOut }: PageProps & {productOut: ProductOut}) {
    const dataTable = productOut.products.map(product => [
        product.name, 
        product.quantity, 
        product.price.toLocaleString('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0}), 
        product.total_price.toLocaleString('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0})
    ]);
    dataTable.push(['', '', 'Jumlah', `${productOut.products.reduce((sum, item) => sum + item.total_price, 0).toLocaleString('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0})}`])

    return (
        <AuthLayout user={auth.user}>
            <h2 className="font-semibold text-gray-800 text-2xl mb-6">Detail Barang Keluar</h2>
            <div className="p-4 bg-white rounded-lg grid grid-cols-2 text-base font-medium gap-x-3 w-fit mb-3">
                <p>ID Transaksi</p>
                <p>: {`BK${productOut.id.toString().padStart(3, '0')}`}</p>
                <p>Tanggal</p>
                <p>: {new Date(productOut.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
            </div>
            <Table 
                    header={[{label: 'Nama Barang'}, {label: 'Jumlah'}, {'label': 'Harga'}, {label: 'Total Harga'}]}
                    body={dataTable}
                />
            
        </AuthLayout>
    )
}