import { Back, Pencil, Save, Trash } from "@/Components/Icons";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";

interface Distributor {
    id: number
    name: string
    phone: string
    address: string
}[]

export default function Detail({ auth, distributor }: PageProps & {distributor: Distributor}) {
    const [isEdit, setIsEdit] = useState(false);
    const { data, setData, put, processing, errors, reset } = useForm({
        name: distributor.name,
        phone: distributor.phone,
        address: distributor.address
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('distributors.edit', {id: `D${distributor.id.toString().padStart(3, '0')}`}));
    };

    return (
        <AuthLayout user={auth.user}>
            <h2 className="font-semibold text-gray-800 text-2xl mb-6">Detail Distributor</h2>
            <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4 bg-white p-4 rounded-md">
                <div className="sm:col-span-2 md:col-span-3">
                    <p className="text-xl font-medium mb-2">Informasi Distributor</p>
                    <hr className="border border-gray-200"/>
                </div>
                <div className="max-w-screen-sm">
                    <label htmlFor="" className={`block mb-1 text-sm font-medium text-gray-600 ${isEdit && "after:content-['*'] after:text-red-500"}`}>Nama Distributor</label>
                    {isEdit ? <input value={data.name} onChange={(e) => setData('name', e.target.value)} type="text" name="phone" className="w-full rounded-md" autoFocus /> : <p className="w-full text-lg text-gray-900">{distributor.name}</p>}
                </div>
                <div className="max-w-screen-sm">
                    <label htmlFor="" className={`block mb-1 text-sm font-medium text-gray-600 ${isEdit && "after:content-['*'] after:text-red-500"}`}>Nomor Telepon</label>
                    {isEdit ? <input value={data.phone} onChange={(e) => setData('phone', e.target.value)} type="text" name="phone" className="w-full rounded-md" /> : <p className="w-full text-lg text-gray-900">{distributor.phone}</p>}
                </div>
                <div className="max-w-screen-sm sm:col-span-2">
                    <label htmlFor="" className={`block mb-1 text-sm font-medium text-gray-600 ${isEdit && "after:content-['*'] after:text-red-500"}`}>Alamat</label>
                    {isEdit ? <textarea value={data.address} onChange={(e) => setData('address', e.target.value)} name="address" className="w-full rounded-md bg-gray-50 border border-gray-300" ></textarea> : <p className="w-full text-lg text-gray-900">{distributor.address}</p>}
                    
                </div>
                <div className="max-w-screen-sm sm:col-span-3 flex gap-2">
                    {!isEdit && (
                        <>
                        <button onClick={() => setIsEdit(true)} className="flex items-center btn-md gap-x-2 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white shadow-md focus:ring-yellow-200"><Pencil className="w-5 h-5"/>Edit</button>
                        <Link href={`/distributors/D${distributor.id.toString().padStart(3, '0')}`} as="button" method="delete" className="flex items-center btn-md gap-x-2 rounded-md bg-red-500 hover:bg-red-600 text-white shadow-md focus:ring-red-200"><Trash className="h-5 w-5"/>Hapus</Link>
                        </>
                        )
                    }
                    {isEdit && (
                        <>
                        <button type="button" onClick={() => setIsEdit(false)} className="flex gap-2 mb-2 text-white bg-gray-500 hover:bg-gray-600 focus:ring focus:outline-none focus:border-none focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 text-center disabled:cursor-not-allowed disabled:bg-gray-400"><Back className="w-5 h-5"/>Batal</button><button type="submit" className="flex gap-2 mb-2 text-white bg-primary-500 hover:bg-primary-600 focus:ring focus:outline-none focus:border-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center disabled:cursor-not-allowed disabled:bg-primary-400"><Save className="w-5 h-5"/> Simpan</button>
                        </>)}
                </div>
            </form>
        </AuthLayout>
    )
}