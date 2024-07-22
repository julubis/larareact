import Alert from "@/Components/Alert";
import Button from "@/Components/Button";
import { Lock, Mail } from "@/Components/Icons";
import Navbar from "@/Components/Navbar";
import PasswordInput from "@/Components/PasswordInput";
import TextInput from "@/Components/TextInput"
import { PageProps } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Login({flash}: PageProps) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="antialiased bg-gray-100">
            <Navbar/>
            <main className="px-4 pt-20 min-h-screen flex flex-col sm:justify-center items-center sm:pt-10 bg-gray-100">
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow p-4 sm:p-6 md:p-8">
                    <h2 className="text-xl font-medium text-center mb-1 text-gray-900">Selamat Datang</h2>
                    <h3 className="text-center text-sm mb-2 text-gray-500 font-medium">Silahkan masuk ke akun Anda</h3>
                    <Alert flash={flash}/>
                    <form className="p-4" onSubmit={submit}>
                        <div className="mb-2">
                            <TextInput
                                label="Email"
                                icon={<Mail className="w-5 h-5"/>}
                                errorMsg={errors.email}
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                autoFocus
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <PasswordInput 
                                label="Kata Sandi" 
                                icon={<Lock className="w-5 h-5"/>} 
                                errorMsg={errors.password} 
                                id="password" 
                                minLength={8} 
                                value={data.password} 
                                onChange={(e) => setData('password', e.target.value)} 
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" type="checkbox" className="text-primary-600 w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring focus:ring-primary-300" checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} />
                                </div>
                                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900">Ingatkan saya</label>
                            </div>
                        </div>
                        <Button className="w-full mb-2" type="submit" disabled={processing}>Masuk</Button>
                        <div className="text-center text-sm font-medium text-gray-500">
                            Belum punya akun? 
                            <Link href="/register" className="text-primary-600 hover:underline">Buat akun</Link>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}