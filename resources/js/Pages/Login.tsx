import { Eye, EyeOff, Lock, Mail } from "@/Components/Icons";
import Navbar from "@/Components/Navbar";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";

export default function Login({}) {
    const [showPass, setShowPass] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
        any: null
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <div className="antialiased bg-gray-100">
            <Navbar/>
            <main className="px-4 pt-20 min-h-screen flex flex-col sm:justify-center items-center sm:pt-0 bg-gray-100">
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                    <form className="" onSubmit={submit}>
                        <h2 className="text-xl font-medium text-center mb-1 text-gray-900">Selamat Datang</h2>
                        <h3 className="text-center text-sm mb-2 text-gray-500 font-medium">Silahkan masuk ke akun Anda</h3>
                        {errors.any && <div className="p-3 mb-2 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            <span className="font-medium">{errors.any}</span>
                        </div>}

                        <div className="mb-2">
                            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 after:content-['*'] after:text-red-500">Email</label>
                            <div className="relative">
                                <input type="email" id="email" className="ps-10 w-full p-2.5 rounded" value={data.email} onChange={(e) => setData('email', e.target.value)} autoFocus />
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <Mail className={`w-5 h-5 ${errors.email ? 'text-red-500' : 'text-gray-500'}`}/>
                                </div>
                            </div>
                            {errors.email && <p className="mt-1 text-xs text-red-600 ">{errors.email}</p>}
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900 after:content-['*'] after:text-red-500">Kata Sandi</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-gray-500">
                                    <Lock className="w-5 h-5"/>
                                </div>
                                <input type={showPass ? 'text' : 'password'} id="password" className="ps-10 w-full p-2.5 rounded" minLength={8} value={data.password} onChange={(e) => setData('password', e.target.value)} required />
                                <button className="absolute inset-y-0 end-0 flex items-center pe-3.5 text-gray-500" type="button" onClick={() => {setShowPass(!showPass)}}>
                                    {showPass ? 
                                        <EyeOff className="w-5 h-5"/> :
                                        <Eye className="w-5 h-5"/>
                                    }
                                </button>
                                {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                            </div>
                        </div>
                        <div className="flex items-start mb-4">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" type="checkbox" className="text-primary-600 w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring focus:ring-primary-300" checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} />
                                </div>
                                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900">Ingatkan saya</label>
                            </div>
                        </div>
                        <button type="submit" className="w-full mb-2 text-white bg-primary-500 hover:bg-primary-600 focus:ring focus:outline-none focus:ring-primary-300 font-medium rounded text-sm px-5 py-2.5 text-center disabled:cursor-not-allowed disabled:bg-primary-400" disabled={processing}>Masuk</button>
                        <div className="text-center text-sm font-medium text-gray-500">
                            Belum punya akun? <Link href="/register" className="text-primary-600 hover:underline">Buat akun</Link>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}