import { Add, ScanBarcode, Search } from "@/Components/Icons";
import Pagination from "@/Components/Pagination";
import Scanner from "@/Components/Scanner";
// import Scanner from "@/Components/Scanner";
import Table from "@/Components/Table";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps, TableHeader } from "@/types";
import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Link, router, usePage } from "@inertiajs/react";
import { ChangeEvent, useRef, useState } from "react";

interface Products {
    data: {
        id: number
        name: string
        category: string
        stock: number
        unit: string
        price: number
    }[]
    current_page: number
    last_page: number
}

export default function Index({ auth, products, flash }: PageProps & {products: Products}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isScan, setIsScan] = useState(false);
    const { query } = usePage<{query: {search?: string}}>().props;
    const [search, setSearch] = useState(query.search);
    const debounce = useRef<number | undefined>();

    const productsList = products.data.map(product => [
        `B${product.id.toString().padStart(3, '0')}`,
        product.name,
        product.category ? product.category : '-',
        product.stock,
        product.unit ? product.unit : '-',
        product.price.toLocaleString('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0}),
        <Link href={`/products/detail/${`B${product.id.toString().padStart(3, '0')}`}`} className="text-primary-600 hover:underline">Detail</Link>
    ]);

    const tableHeader: TableHeader[] = [
        {name: 'id', label: 'ID', sortable: true},
        {name: 'name', label: 'Nama Barang', sortable: true},
        {name: 'category', label: 'Kategori', sortable: true},
        {name: 'stock', label: 'Stok', sortable: true},
        {name: 'unit', label: 'Satuan', sortable: true},
        {name: 'price', label: 'Harga', sortable: true},
        {label: 'Aksi'},
    ];

    const searchHandler  = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        const search = e.target.value.trim();
        if (debounce.current) {
            clearTimeout(debounce.current);
        }
        debounce.current = window.setTimeout(() => {
            router.get('', { search }, {
                preserveState: true, preserveScroll: true
            });
        }, 500);
    }
    
    return (
        <AuthLayout user={auth.user}>
            <div>
                <h2 className="font-semibold text-gray-800 text-2xl mb-6 pt-2">Data Barang</h2>
                <div className="mb-2 flex sm:flex-row flex-col-reverse sm:justify-between gap-3">
                    <div className="relative w-full">
                        <input onChange={searchHandler} value={search} type="text" className="w-full p-2.5 rounded-md ps-10" placeholder="Cari barang..." />
                        <div className="absolute inset-y-0 start-2.5 flex items-center text-gray-500">
                            <Search className="w-5 h-5"/>
                        </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                        <button onClick={() => setIsOpen(true)} className="flex items-center btn-md gap-x-2 rounded-md bg-gray-500 hover:bg-gray-600 text-white shadow-md focus:ring-gray-200">
                            <ScanBarcode className="w-5 h-5"/>
                            Scan
                        </button>
                        <Link href="/products/new" className="btn-md flex gap-x-2 rounded-md bg-primary-500 hover:bg-primary-600 text-white shadow-md focus:ring-primary-200">
                            <Add className="w-5 h-5"/>
                            Tambah
                        </Link>
                    </div>
                </div>
                {flash.success && <div className="p-3 mb-2 text-sm text-green-800 rounded-lg bg-green-50 border border-green-200" role="alert">
                    {flash.success}
                </div>}
                <Table header={tableHeader} body={productsList}>
                    {search?.length ? 'Barang tidak ditemukan' : 'Barang masih kosong'}
                </Table>
                <div className="flex justify-center">
                <Pagination page={products.current_page} totalPage={products.last_page}/>
                <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/60">
                    <DialogPanel className="max-w-lg space-y-4 border p-12 bg-white shadow-md">
                        <DialogTitle className="font-bold">Deactivate account</DialogTitle>
                        <Description>This will permanently deactivate your account</Description>
                        <p>Are you sure you want to deactivate your account? All of your data will be permanently removed.</p>
                        <div className="flex gap-4">
                            <button onClick={() => setIsScan(!isScan)}>scan</button>
                            <div id="scanner"></div>
                            {isScan && <Scanner/>}
                        </div>
                    </DialogPanel>
                    </div>
                </Dialog>
                </div>
            </div>
        </AuthLayout>
    )
}