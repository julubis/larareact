import { Add, ScanBarcode, Search } from "@/Components/Icons";
import Pagination from "@/Components/Pagination";
import Table from "@/Components/Table";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps, TableHeader } from "@/types";
import { Link } from "@inertiajs/react";

export default function Distributor({ auth }: PageProps) {
    const tableHeader: TableHeader[] = [
        {name: 'id', label: 'No', sortable: true},
        {name: 'name', label: 'Nama', sortable: true},
        {name: 'phone', label: 'Telepon', sortable: true},
        {name: 'address', label: 'Alamat'},
        {label: 'Aksi'},
    ];

    return (
        <AuthLayout user={auth.user}>
            <div className="p-4 bg-white rounded-lg shadow">
                <h2 className="font-medium text-xl mb-6">Data Distributor</h2>
                <div className="mb-2 flex md:flex-row flex-col-reverse md:justify-between gap-2">
                    <div className="relative w-full md:w-80">
                        <input type="text" id="email" className="w-full md:w-96 p-2.5 rounded ps-36" placeholder="Cari barang..." />
                        <div className="absolute inset-y-0 start-28 flex items-center text-gray-500">
                            <Search className="w-5 h-5"/>
                        </div>
                        <button className="absolute inset-y-0 start-0 flex items-center btn-md gap-x-2 rounded bg-primary-500 hover:bg-primary-600 text-white">
                            <ScanBarcode className="w-5 h-5"/>
                            Scan
                        </button>
                    </div>
                    <button className="btn-md flex gap-x-2 end-0 max-w-fit bg-primary-500 hover:bg-primary-600 text-white rounded">
                        <Add className="w-5 h-5"/>
                        Tambah Barang
                    </button>
                </div>
                <Table header={tableHeader} body={[[1, 'macbook'],[2, 'xiaomi'],[3, 'vivobook']]}/>
                <div className="flex justify-end">
                <Pagination/>
                </div>
            </div>
        </AuthLayout>
    )
}