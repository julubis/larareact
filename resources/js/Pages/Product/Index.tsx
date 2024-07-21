import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import { Add, ScanBarcode } from "@/Components/Icons";
import Pagination from "@/Components/Pagination";
import Scanner from "@/Components/Scanner";
import SearchBox from "@/Components/SearchBox";
import Table from "@/Components/Table";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps, TableHeader } from "@/types";
import { priceFormat, productIdFormat } from "@/utils/formats";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

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
    const { query } = usePage<{query: {search?: string}}>().props;

    const productsList = products.data.map(product => [
        productIdFormat(product.id),
        product.name,
        product.category ? product.category : '-',
        product.stock,
        product.unit ? product.unit : '-',
        priceFormat(product.price),
        <Link href={`/products/detail/${productIdFormat(product.id)}`} className="text-primary-600 hover:underline">Detail</Link>
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
    
    return (
        <AuthLayout user={auth.user}>
            <div>
                <h2 className="font-semibold text-gray-800 text-2xl mb-6 pt-2">Data Barang</h2>
                <div className="mb-2 flex sm:flex-row flex-col-reverse sm:justify-between gap-3">
                    <SearchBox value={query.search} placeholder="Cari barang..."/>
                    <div className="flex gap-3 justify-end">
                        <Button 
                            colorScheme="secondary"
                            icon={<ScanBarcode className="w-5 h-5"/>}
                            onClick={() => setIsOpen(true)}
                        >Scan
                        </Button>
                        <Link href="/products/new" className="btn primary">
                            <Add className="w-5 h-5"/>
                            Tambah
                        </Link>
                    </div>
                </div>
                <Alert flash={flash}/>
                <Table header={tableHeader} body={productsList}>
                    {query.search?.length ? 'Barang tidak ditemukan' : 'Barang masih kosong'}
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