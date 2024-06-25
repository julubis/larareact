import { Back, Save } from "@/Components/Icons";
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
    const { data, setData, post, processing, errors, reset } = useForm({
        name: distributor.name,
        phone: distributor.phone,
        address: distributor.address
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('distributor.add'));
    };

    return (
        <AuthLayout user={auth.user}>
            <h2 className="font-semibold text-gray-800 text-2xl mb-6">Detail Distributor</h2>
            <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4 bg-white p-4 rounded-md">
                <div className="max-w-screen-sm">
                    <label htmlFor="" className={`block mb-1 text-sm font-medium text-gray-900 ${isEdit && "after:content-['*'] after:text-red-500"}`}>Nama Distributor</label>
                    {isEdit ? <input value={distributor.name} onChange={(e) => setData('name', e.target.value)} type="text" name="phone" className="w-full rounded-md" autoFocus /> : <div className="w-full rounded-md text-sm border border-gray-300 p-2">{distributor.name}</div>}

                </div>
                <div className="max-w-screen-sm">
                    <label htmlFor="" className={`block mb-1 text-sm font-medium text-gray-900 ${isEdit && "after:content-['*'] after:text-red-500"}`}>Nomor Telepon</label>
                    {isEdit ? <input value={distributor.phone} onChange={(e) => setData('phone', e.target.value)} type="text" name="phone" className="w-full rounded-md" /> : <div className="w-full rounded-md text-sm border border-gray-300 p-2">{distributor.phone}</div>}
                </div>
                <div className="max-w-screen-sm sm:col-span-2">
                    <label htmlFor="" className={`block mb-1 text-sm font-medium text-gray-900 ${isEdit && "after:content-['*'] after:text-red-500"}`}>Alamat</label>
                    {isEdit ? <textarea value={distributor.address} onChange={(e) => setData('address', e.target.value)} name="address" className="w-full rounded-md bg-gray-50 border border-gray-300" ></textarea> : <div className="w-full rounded-md text-sm border border-gray-300 p-2">{distributor.address}</div>}
                    
                </div>
                <div className="max-w-screen-sm sm:col-span-3 flex gap-2">
                    {!isEdit && (
                        <>
                        <button onClick={() => setIsEdit(true)} className="flex gap-2 mb-2 text-black border border-gray-300 bg-white hover:text-white hover:bg-primary-500 focus:ring focus:outline-none focus:border-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center"><Back className="w-5 h-5"/>Edit</button>
                        <Link href={`/distributors/D${distributor.id.toString().padStart(3, '0')}`} as="button" method="delete" className="flex gap-2 mb-2 text-black border border-gray-300 bg-white hover:text-white hover:bg-primary-500 focus:ring focus:outline-none focus:border-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center">Hapus</Link>
                        </>
                        )
                    }
                    {isEdit && (
                        <>
                        <button onClick={() => setIsEdit(false)} className="flex gap-2 mb-2 text-black border border-gray-300 bg-white hover:text-white hover:bg-primary-500 focus:ring focus:outline-none focus:border-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center"><Back className="w-5 h-5"/>Batal</button><button type="submit" className="flex gap-2 mb-2 text-white bg-primary-500 hover:bg-primary-600 focus:ring focus:outline-none focus:border-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center disabled:cursor-not-allowed disabled:bg-primary-400"><Save className="w-5 h-5"/> Simpan</button>
                        </>)}
                </div>
            </form>
        </AuthLayout>
    )
}