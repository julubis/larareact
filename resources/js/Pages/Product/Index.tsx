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

                <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-40">
                    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
                    <DialogPanel className="max-w-screen-sm h-fit w-full">
                        <div className="flex flex-col relative">
                            <div className="absolute z-50 text-center left-1/2 -translate-x-1/2 w-full mt-4">
                                <p className="text-white font-bold text-lg">Arahkan kamera ke barcode</p>
                                <p className="text-gray-100 font-medium text-md">Tempatkan barcode ke dalam kotak</p>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="absolute bg-white/50 z-50 top-4 right-4 rounded-full text-center w-10 h-10">x</button>
                            {isOpen && <Scanner updateData={setIsOpen}/>}
                        </div>
                    </DialogPanel>
                    </div>
                </Dialog>
                </div>
            </div>
        </AuthLayout>
    )
}