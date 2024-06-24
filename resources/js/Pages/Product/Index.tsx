import { Add, ScanBarcode, Search } from "@/Components/Icons";
import Pagination from "@/Components/Pagination";
import Scanner from "@/Components/Scanner";
import Table from "@/Components/Table";
import AddProduct from "@/Layouts/AddProduct";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps, TableHeader } from "@/types";
import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Link, router, usePage } from "@inertiajs/react";
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

export default function Product({ auth, products }: PageProps & {products: Products}) {
    const [isOpen, setIsOpen] = useState(false);
    const [addProduct, setAddProduct] = useState(false);
    const [isScan, setIsScan] = useState(false);
    const { query } = usePage<{query: {search?: string}}>().props;
    const [search, setSearch] = useState(query.search);

    const productsList = products.data.map(product => [
        `B${product.id.toString().padStart(3, '0')}`,
        product.name,
        product.category ? product.category : '-',
        product.stock,
        product.unit ? product.unit : '-',
        product.price.toLocaleString('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0}),
        <Link href={`/products/${`B${product.id.toString().padStart(3, '0')}`}`} className="text-primary-600 hover:underline">Detail</Link>
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
            {
                addProduct ?
                <AddProduct/> :
                <div>
                    <h2 className="font-semibold text-gray-800 text-2xl mb-6 pt-2">Data Barang</h2>
                    <div className="mb-2 flex sm:flex-row flex-col-reverse sm:justify-between gap-2">
                        <div className="relative">
                            <input onChange={(e) => {
                                setSearch(e.target.value);
                                setTimeout(() => {
                                    router.get('', {search: e.target.value.trim()}, {preserveState: true});
                                }, 500);
                            }} value={search} type="text" className="w-full sm:w-fit p-2.5 rounded-md ps-10" placeholder="Cari barang..." />
                            <div className="absolute inset-y-0 start-2.5 flex items-center text-gray-500">
                                <Search className="w-5 h-5"/>
                            </div>
                        </div>
                        <div className="flex gap-3 justify-end">
                            <button onClick={() => setIsOpen(true)} className="flex items-center btn-md gap-x-2 rounded-md bg-white hover:bg-primary-500 text-black hover:text-white shadow-md">
                                    <ScanBarcode className="w-5 h-5"/>
                                    Scan
                                </button>
                            <button onClick={() => setAddProduct(true)} className="btn-md flex gap-x-2 rounded-md bg-primary-500 hover:bg-primary-600 text-white shadow-md">
                                <Add className="w-5 h-5"/>
                                Tambah
                            </button>
                        </div>
                    </div>
                    <Table header={tableHeader} body={productsList}>
                        <p className="text-lg text-black">Data barang tidak ditemukan</p>
                    </Table>
                    <div className="flex justify-center">
                    <Pagination page={products.current_page} totalPage={products.last_page}/>
                    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/5 backdrop-blur-sm">
                        <DialogPanel className="max-w-lg space-y-4 border p-12 bg-white shadow-md">
                            <DialogTitle className="font-bold">Deactivate account</DialogTitle>
                            <Description>This will permanently deactivate your account</Description>
                            <p>Are you sure you want to deactivate your account? All of your data will be permanently removed.</p>
                            <div className="flex gap-4">
                                <button onClick={() => setIsScan(!isScan)}>scan</button>
                                <div id="scanner"></div>
                                {/* {isScan && <Scanner/>} */}
                            </div>
                        </DialogPanel>
                        </div>
                    </Dialog>
                    </div>
                </div>
            }
        </AuthLayout>
    )
}