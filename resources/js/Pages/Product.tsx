import { Add, ScanBarcode, Search } from "@/Components/Icons";
import Pagination from "@/Components/Pagination";
import Table from "@/Components/Table";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps, TableHeader } from "@/types";
import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function Product({ auth, products }: PageProps & {products: Record<string, string>[]}) {
    const [isOpen, setIsOpen] = useState(false);
    const productsList = products.map(product => [
        product.id,
        product.name,
        product.category_id,
        product.stock,
        product.unit_id,
        product.price
    ]);

    const tableHeader: TableHeader[] = [
        {name: 'id', label: 'No', sortable: true},
        {name: 'name', label: 'Nama Barang', sortable: true},
        {name: 'category', label: 'Kategori', sortable: true},
        {name: 'stock', label: 'Stok', sortable: true},
        {name: 'unit', label: 'Satuan', sortable: true},
        {name: 'price', label: 'Harga (Rp)', sortable: true},
        {label: 'Aksi'},
    ];
    
    return (
        <AuthLayout user={auth.user}>
            <div>
                <h2 className="font-medium text-xl mb-6">Data Barang</h2>
                <div className="mb-2 flex md:flex-row flex-col-reverse md:justify-between gap-2">
                    <div className="relative w-full md:w-80">
                        <input onChange={(e) => {
                            setTimeout(() => {
                                router.get('', {search: e.target.value.trim()}, {preserveState: true})
                            }, 500);
                        }} type="text" id="search" className="w-full md:w-96 p-2.5 rounded ps-[8.75rem]" placeholder="Cari barang..." />
                        <div className="absolute inset-y-0 start-28 flex items-center text-gray-500">
                            <Search className="w-5 h-5"/>
                        </div>
                        <button onClick={() => setIsOpen(true)} className="absolute inset-y-0 start-0 flex items-center btn-md gap-x-2 rounded bg-primary-500 hover:bg-primary-600 text-white">
                            <ScanBarcode className="w-5 h-5"/>
                            Scan
                        </button>
                    </div>
                    <button className="btn-md flex gap-x-2 end-0 max-w-fit bg-primary-500 hover:bg-primary-600 text-white rounded">
                        <Add className="w-5 h-5"/>
                        Tambah Barang
                    </button>
                </div>
                <Table header={tableHeader} body={productsList}/>
                <div className="flex justify-end">
                <Pagination/>
                <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/5 backdrop-blur-sm">
                    <DialogPanel className="max-w-lg space-y-4 border p-12 bg-white shadow-md">
                        <DialogTitle className="font-bold">Deactivate account</DialogTitle>
                        <Description>This will permanently deactivate your account</Description>
                        <p>Are you sure you want to deactivate your account? All of your data will be permanently removed.</p>
                        <div className="flex gap-4">
                        <button onClick={() => setIsOpen(false)}>Cancel</button>
                        <button onClick={() => setIsOpen(false)}>Deactivate</button>
                        </div>
                    </DialogPanel>
                    </div>
                </Dialog>
                </div>
            </div>
        </AuthLayout>
    )
}