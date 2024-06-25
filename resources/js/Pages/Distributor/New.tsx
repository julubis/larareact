import { Back, Save } from "@/Components/Icons";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { PageProps } from "@/types";
import AuthLayout from "@/Layouts/AuthLayout";

export default function New({ auth }: PageProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        address: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('distributors.add'));
    };

    return (
        <AuthLayout user={auth.user}>
            <h2 className="font-semibold text-gray-800 text-2xl mb-6 pt-3">Tambah Distributor Baru</h2>
            <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4 bg-white p-4 rounded-md">
                <div className="max-w-screen-sm">
                    <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900 after:content-['*'] after:text-red-500">Nama Distributor</label>
                    <input value={data.name} onChange={(e) => setData('name', e.target.value)}  type="text" name="name" className="w-full rounded-md" autoFocus required />
                </div>
                <div className="max-w-screen-sm">
                    <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900 after:content-['*'] after:text-red-500">Nomor Telepon</label>
                    <input value={data.phone} onChange={(e) => setData('phone', e.target.value)} type="text" name="price" className="w-full rounded-md" required />
                </div>
                
                <div className="max-w-screen-sm sm:col-span-2">
                    <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900 after:content-['*'] after:text-red-500">Alamat</label>
                    <textarea value={data.address} onChange={(e) => setData('address', e.target.value)}  name="description" className="w-full rounded-md bg-gray-50 border border-gray-300" required></textarea>
                </div>
                <div className="max-w-screen-sm sm:col-span-3 flex gap-2">
                    <Link href="/distributors" className="flex items-center btn-md gap-x-2 rounded-md bg-gray-500 hover:bg-gray-600 text-white shadow-md focus:ring-gray-200"><Back className="w-5 h-5"/>Kembali</Link>
                    <button type="submit" className="btn-md flex gap-2 rounded-md bg-primary-500 hover:bg-primary-600 text-white shadow-md focus:ring-primary-200"><Save className="w-5 h-5"/> Simpan</button>
                </div>
                
            </form>
        </AuthLayout>
    )
}