import { Add, ScanBarcode, Search } from "@/Components/Icons";
import Pagination from "@/Components/Pagination";
// import Scanner from "@/Components/Scanner";
import Table from "@/Components/Table";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps, TableHeader } from "@/types";
import { Link, router, usePage } from "@inertiajs/react";
import { ChangeEvent, useRef, useState } from "react";

interface Distributors {
    data: {
        id: number
        name: string
        phone: string
        address: string
    }[]
    current_page: number
    last_page: number
}

export default function Index({ auth, flash, distributors }: PageProps & {distributors: Distributors}) {
    const { query } = usePage<{query: {search?: string}}>().props;
    const [search, setSearch] = useState(query.search);
    const debounce = useRef<number | undefined>();

    const distributorsList = distributors.data.map(distributor => [
        `D${distributor.id.toString().padStart(3, '0')}`,
        distributor.name,
        distributor.phone,
        distributor.address,
        <Link href={`/distributors/detail/${`D${distributor.id.toString().padStart(3, '0')}`}`} className="text-primary-600 hover:underline">Detail</Link>
    ]);

    const tableHeader: TableHeader[] = [
        {name: 'id', label: 'ID', sortable: true},
        {name: 'name', label: 'Nama Distributor', sortable: true},
        {name: 'phone', label: 'Telepon'},
        {name: 'address', label: 'Alamat'},
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
                <h2 className="font-semibold text-gray-800 text-2xl mb-6 pt-2">Data Distributor</h2>
                <div className="mb-2 flex sm:flex-row flex-col-reverse sm:justify-between gap-3">
                    <div className="relative w-full">
                        <input onChange={searchHandler} value={search} type="text" className="w-full p-2.5 rounded-md ps-10" placeholder="Cari distributor..." />
                        <div className="absolute inset-y-0 start-2.5 flex items-center text-gray-500">
                            <Search className="w-5 h-5"/>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Link href="/distributors/new" className="btn-md flex gap-x-2 rounded-md bg-primary-500 hover:bg-primary-600 text-white shadow-md focus:ring-primary-200">
                            <Add className="w-5 h-5"/>
                            Tambah
                        </Link>
                    </div>
                </div>
                {flash.success && <div className="p-3 mb-2 text-sm text-green-800 rounded-lg bg-green-50 border border-green-200" role="alert">
                    {flash.success}
                </div>}
                <Table header={tableHeader} body={distributorsList}>
                    {search?.length ? 'Distributor tidak ditemukan' : 'Distributor masih kosong'}
                </Table>
                <div className="flex justify-center">
                <Pagination page={distributors.current_page} totalPage={distributors.last_page}/>
                </div>
            </div>
        </AuthLayout>
    )
}