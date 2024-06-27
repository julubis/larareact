import { Back, Eye, EyeOff, Pencil, Save, Trash } from "@/Components/Icons";
import Table from "@/Components/Table";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";

export default function Index({ auth, flash }: PageProps) {
    const [showPass1, setShowPass1] = useState(false);
    const [showPass2, setShowPass2] = useState(false);

    const { data, setData, put, processing, errors, reset } = useForm({
        name: auth.user.name,
        email: auth.user.email,
        password: '',
        current_password: ''
    });

    const changeAcc = () => {
        put(route('account.update-profile'));
    }

    const changePass = () => {
        put(route('account.update-password'));
        reset('password', 'current_password');
    }

    return (
        <AuthLayout user={auth.user}>
            <h2 className="font-semibold text-gray-800 text-2xl mb-6">Akun Saya</h2>
            {flash.success && <div className="p-3 mb-2 text-sm text-green-800 rounded-lg bg-green-50 border border-green-200" role="alert">
                {flash.success}
                {/* {JSON.stringify(errors)} */}
            </div>}
            <div className="grid grid-cols-1 w-full gap-4 bg-white p-4 rounded-md">
                <div className="">
                    <p className="text-xl font-medium mb-2">Informasi Akun</p>
                    <hr className="border border-gray-200"/>
                </div>
                <div className="max-w-screen-sm">
                    <label htmlFor="" className={`block mb-1 text-sm font-medium text-gray-600"}`}>Nama</label>
                    <input value={data.name} onChange={(e) => setData('name', e.target.value)} type="text" name="name" className="w-full rounded-md" />
                </div>
                <div className="max-w-screen-sm">
                    <label htmlFor="" className={`block mb-1 text-sm font-medium text-gray-600"}`}>Email</label>
                    <input value={data.email} onChange={(e) => setData('email', e.target.value)} type="text" name="email" className="w-full rounded-md" />
                </div>
                <div className="max-w-screen-sm mb-4">
                    <button onClick={changeAcc} type="button" className="flex gap-2 mb-2 text-white bg-primary-500 hover:bg-primary-600 focus:ring focus:outline-none focus:border-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center disabled:cursor-not-allowed disabled:bg-primary-400"><Save className="w-5 h-5"/> Simpan</button>
                </div>
                <div className="">
                    <p className="text-xl font-medium mb-2">Ubah Kata Sandi</p>
                    <hr className="border border-gray-200"/>
                </div>
                <div className="max-w-screen-sm">
                    <label htmlFor="" className={`block mb-1 text-sm font-medium text-gray-600"}`}>Kata Sandi Lama</label>
                    <div className="relative">
                        <input type={showPass1 ? 'text' : 'password'} id="password" className="w-full p-2.5 rounded" minLength={8} value={data.current_password} onChange={(e) => setData('current_password', e.target.value)} required />
                        <button className="absolute inset-y-0 end-0 flex items-center pe-3.5 text-gray-500" type="button" onClick={() => {setShowPass1(!showPass1)}}>
                            {showPass1 ? 
                                <EyeOff className="w-5 h-5"/> :
                                <Eye className="w-5 h-5"/>
                            }
                        </button>
                    </div>
                    {errors.current_password && <p className="mt-1 text-xs text-red-600">{errors.current_password}</p>}

                </div>
                <div className="max-w-screen-sm">
                    <label htmlFor="" className={`block mb-1 text-sm font-medium text-gray-600"}`}>Kata Sandi Baru</label>
                    <div className="relative">
                        <input type={showPass2 ? 'text' : 'password'} id="password" className="w-full p-2.5 rounded" minLength={8} value={data.password} onChange={(e) => setData('password', e.target.value)} required />
                        <button className="absolute inset-y-0 end-0 flex items-center pe-3.5 text-gray-500" type="button" onClick={() => {setShowPass2(!showPass2)}}>
                            {showPass2 ? 
                                <EyeOff className="w-5 h-5"/> :
                                <Eye className="w-5 h-5"/>
                            }
                        </button>
                    </div>
                    {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                </div>
                <div className="max-w-screen-sm mb-4">
                    <button type="button" onClick={changePass} className="flex gap-2 mb-2 text-white bg-primary-500 hover:bg-primary-600 focus:ring focus:outline-none focus:border-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center disabled:cursor-not-allowed disabled:bg-primary-400"><Save className="w-5 h-5"/> Simpan</button>
                </div>
            </div>  
        </AuthLayout>
    )
}