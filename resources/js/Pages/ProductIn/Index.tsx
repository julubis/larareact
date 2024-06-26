import { Add, Search } from "@/Components/Icons";
import Pagination from "@/Components/Pagination";
import Table from "@/Components/Table";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps, TableHeader } from "@/types";
import { Link, router, usePage } from "@inertiajs/react";
import { ChangeEvent, useRef, useState } from "react";

interface ProductIns {
    data: {
        id: number
        date: string
        distributor: string
        total_price: number
    }[]
    current_page: number
    last_page: number
}

export default function Index({ auth, productIns, flash }: PageProps & {productIns: ProductIns}) {
    const { query } = usePage<{query: {search?: string}, flash: {type: string, message: string}}>().props;
    const [search, setSearch] = useState(query.search);
    const [date, setDate] = useState('');
    const debounce = useRef<number | undefined>(undefined);

    const productInList = productIns.data.map(productIn => [
        `BM${productIn.id.toString().padStart(3, '0')}`,
        productIn.date,
        productIn.distributor,
        productIn.total_price.toLocaleString('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0}),
        <Link href={`/product-in/detail/${`BM${productIn.id.toString().padStart(3, '0')}`}`} className="text-primary-600 hover:underline">Detail</Link>
    ]);

    const tableHeader: TableHeader[] = [
        {name: 'id', label: 'ID Transaksi', sortable: true},
        {name: 'date', label: 'Tanggal', sortable: true},
        {name: 'distributor', label: 'Distributor'},
        {name: 'total_price', label: 'Total Harga'},
        {label: 'Aksi'},
    ];

    const searchHandler  = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        if (debounce.current) {
            clearTimeout(debounce.current);
        }
        debounce.current = window.setTimeout(() => {
            router.get('', { search: e.target.value.trim() }, {
                preserveState: true, preserveScroll: true
            });
        }, 500);
    }
    
    return (
        <AuthLayout user={auth.user}>
            <div>
                <h2 className="font-semibold text-gray-800 text-2xl mb-6 pt-2">Transaksi Barang Masuk</h2>
                {date}
                <div className="mb-2 flex sm:flex-row flex-col-reverse sm:justify-between gap-3">
                    <div className="relative w-full">
                        <input onChange={searchHandler} value={search} type="text" className="w-full p-2.5 rounded-md ps-10" placeholder="Cari ID Transaksi..." />
                        <div className="absolute inset-y-0 start-2.5 flex items-center text-gray-500">
                            <Search className="w-5 h-5"/>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        {/* <input type="date" name="date" id="date" placeholder="Pilih Tanggal" className="rounded-md" value={date} onChange={(e) => setDate(e.target.value)} max={Date.now()} /> */}
                        <Link href="/product-in/new" className="btn-md flex gap-x-2 rounded-md bg-primary-500 hover:bg-primary-600 text-white shadow-md focus:ring-primary-200">
                            <Add className="w-5 h-5"/>
                            Tambah
                        </Link>
                    </div>
                </div>
                {flash.success && <div className="p-3 mb-2 text-sm text-green-800 rounded-lg bg-green-50 border border-green-200" role="alert">
                    {flash.success}
                </div>}
                <Table header={tableHeader} body={productInList}>
                    {search?.length ? 'Transaksi tidak ditemukan' : 'Transaksi masih kosong'}
                </Table>
                <div className="flex justify-center">
                <Pagination page={productIns.current_page} totalPage={productIns.last_page}/>
                </div>
            </div>
        </AuthLayout>
    )
}