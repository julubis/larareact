import { Archive, Box, Dashboard, Groups, Person, Unarchive } from "@/Components/Icons";
import { User } from "@/types";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, useState } from "react";

export default function AuthLayout({user, children}: PropsWithChildren<{user: User}>) {
    const [toggle, setToggle] = useState(false);
    const { url } = usePage();

    return (
        <div className="antialiased bg-gray-100">
            <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-30">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="flex justify-start items-center">
                    <button
                        className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100"
                        onClick={() => {setToggle(!toggle)}}
                    >
                        <svg
                        aria-hidden="true"
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            fill-rule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clip-rule="evenodd"
                        ></path>
                        </svg>
                        <svg
                        aria-hidden="true"
                        className="hidden w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        ></path>
                        </svg>
                        <span className="sr-only">Toggle sidebar</span>
                    </button>
                    <Link href="/" className="flex items-center justify-between mr-4">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap">Stokku</span>
                    </Link>
                    </div>
                    <div className="flex items-center lg:order-2">
                        <div className="hidden md:block px-3">
                            <span className="block text-sm font-medium text-gray-900">{user.name}</span>
                            <span className="block text-xs text-gray-500 truncate">{user.email}</span>
                        </div>

                        <Popover className="relative">
                            <PopoverButton className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"><img className="w-8 h-8 rounded-full" src="" alt="user photo" /></PopoverButton>
                            <PopoverPanel anchor="bottom end" className="my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow flex flex-col z-40">
                                <Link href="/account" className="block px-4 py-2 text-sm">Profil</Link>
                                <Link href={route('logout')} method="post" as="button" className="block px-4 py-2 text-sm">Keluar</Link>
                            </PopoverPanel>
                        </Popover>
                    </div>
                </div>
            </nav>

            <aside className={`fixed z-20 top-0 left-0 w-64 h-screen pt-14 transition-transform ${toggle ? 'translate-x-0 md:-translate-x-full' : '-translate-x-full md:translate-x-0'} bg-white border-r border-gray-200`} aria-label="Sidenav" id="drawer-navigation">
                <div className="overflow-y-auto py-5 px-3 h-full bg-white">
                    <ul className="space-y-2">
                        <li>
                            <Link href="/home" className={`flex items-center gap-2 py-2 px-5 rounded text-base font-medium ${url.startsWith('/home') ? 'text-white bg-primary-500 hover:bg-primary-600' : 'text-gray-900 rounded hover:bg-primary-50'}`}>
                            <Dashboard className="w-5 h-5"/>
                            Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/products" className={`flex items-center gap-2 py-2 px-5 rounded text-base font-medium ${url.startsWith('/products') ? 'text-white bg-primary-500 hover:bg-primary-600' : 'text-gray-900 rounded hover:bg-primary-50'}`}>
                            <Box className="w-5 h-5"/>
                            Data Barang
                            </Link>
                        </li>
                        <li>
                            <Link href="/distributors" className={`flex items-center gap-2 py-2 px-5 rounded text-base font-medium ${url.startsWith('/distributors') ? 'text-white bg-primary-500 hover:bg-primary-600' : 'text-gray-900 rounded hover:bg-primary-50'}`}>
                            <Groups className="w-5 h-5"/>
                            Data Distributor
                            </Link>
                        </li>
                        <li>
                            <Link href="/product-incoming" className={`flex items-center gap-2 py-2 px-5 rounded text-base font-medium ${url.startsWith('/product-incoming') ? 'text-white bg-primary-500 hover:bg-primary-600' : 'text-gray-900 rounded hover:bg-primary-50'}`}>
                            <Archive className="w-5 h-5"/>
                            Barang Masuk
                            </Link>
                        </li>
                        <li>
                            <Link href="/product-outgoing" className={`flex items-center gap-2 py-2 px-5 rounded text-base font-medium ${url == '/product-outgoing' ? 'text-white bg-primary-500 hover:bg-primary-600' : 'text-gray-900 rounded hover:bg-primary-50'}`}>
                            <Unarchive className="w-5 h-5"/>
                            Barang Keluar
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className={`flex items-center gap-2 py-2 px-5 rounded text-base font-medium ${url == '/' ? 'text-white bg-primary-500 hover:bg-primary-600' : 'text-gray-900 rounded hover:bg-primary-50'}`}>
                            <Person className="w-5 h-5"/>
                            Akun
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>

            <main className={`p-4 z-0 ${toggle ? '' : 'md:ml-64'} h-screen pt-20`}>
                <span className={`md:hidden fixed top-0 left-0 h-full bg-black/60 backdrop-blur-sm w-full z-10 ${!toggle && 'hidden'}`} onClick={() => setToggle(false)}></span>
                {children}
            </main>
        </div>
    )
}