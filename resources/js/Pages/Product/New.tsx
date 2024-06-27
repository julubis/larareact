import { ArrowUnfold, Back, Save } from "@/Components/Icons";
import { Link, router, useForm } from "@inertiajs/react";
import { FormEventHandler, useRef, useState } from "react";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { PageProps } from "@/types";
import AuthLayout from "@/Layouts/AuthLayout";

export default function New({ auth, categories, units, barcode }: PageProps & {
    categories: {id: number | null, name: string}[],
    units: {id: number | null, name: string}[],
    barcode: string
} ) {
    const [category, setCategory] = useState('');
    const [unit, setUnit] = useState('');
    const debounce = useRef<number | undefined>();

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        category: {id: 0, name: ''},
        unit: {id: 0, name: ''},
        price: '0',
        code: barcode || '',
        description: ''
    });

    const showOption = (data: Record<string, string>) => {
        if (debounce.current) {
            clearTimeout(debounce.current);
        }
        debounce.current = window.setTimeout(() => {
            router.get('', data, {
                preserveState: true, preserveScroll: true
            });
        }, 500);
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('products.add'));
    };

    return (
        <AuthLayout user={auth.user}>
            <h2 className="font-semibold text-gray-800 text-2xl mb-6 pt-3">Tambah Barang Baru</h2>
            <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4 bg-white p-4 rounded-md">
                <div className="sm:col-span-2 md:col-span-3">
                    <p className="text-xl font-medium mb-2">Informasi Barang</p>
                    <hr className="border border-gray-200"/>
                </div>
                <div className="max-w-screen-sm">
                    <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900 after:content-['*'] after:text-red-500">Nama Barang</label>
                    <input value={data.name} onChange={(e) => setData('name', e.target.value)}  type="text" name="name" className="w-full rounded-md" autoFocus required />
                    {errors.name && <p className="mt-1 text-xs text-red-600 ">{errors.name}</p>}
                </div>
                <div className="max-w-screen-sm">
                    <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900 after:content-['*'] after:text-red-500">Harga (Rp)</label>
                    <input value={data.price} onChange={(e) => setData('price', e.target.value)} min={0} type="number" name="price" className="w-full rounded-md" />
                    {errors.price && <p className="mt-1 text-xs text-red-600 ">{errors.price}</p>}
                </div>
                <div className="max-w-screen-sm">
                    <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900">Kategori</label>
                    <Combobox value={data.category} onChange={(value) => setData('category', value ? {id: value.id, name: value.name}: {id:0, name:''})} onClose={() => setCategory('')}>
                        <div className="relative">
                        <ComboboxInput
                            displayValue={(category: {name?: string}) => category?.name || ''}
                            onChange={(event) => {
                                setCategory(event.target.value.trim())
                                showOption({category: event.target.value.trim()})
                            }}
                            className="w-full rounded-md"
                        />
                        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                            <ArrowUnfold className="size-4 text-gray-500" />
                        </ComboboxButton>
                        </div>
                        
                        <ComboboxOptions
                        anchor="bottom start"
                        className="bg-white border border-gray-300 rounded-md"
                        >
                        {category.trim().length > 0 && categories.length == 0  && (
                        <ComboboxOption value={{ id: null, name: category }} className="group text-sm flex cursor-default items-center gap-2 py-1.5 px-3 select-none data-[focus]:bg-primary-100">
                            Tambah kategori<span className="font-medium">"{category}"</span>
                        </ComboboxOption>
                        )}
                        {categories.map((category) => (
                            <ComboboxOption
                            key={category.id}
                            value={category}
                            className="group flex cursor-default items-center gap-2 py-1.5 px-3 select-none data-[focus]:bg-primary-100"
                            >
                            {/* <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" /> */}
                            <div className="text-sm/6 text-black">{category.name}</div>
                            </ComboboxOption>
                        ))}
                        </ComboboxOptions>
                    </Combobox>
                    {errors.category && <p className="mt-1 text-xs text-red-600 ">{errors.category}</p>}
                </div>
                <div className="max-w-screen-sm">
                    <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900">Satuan</label>
                    <Combobox value={data.unit} onChange={(value) => setData('unit', value ? {id: value.id, name: value.name}: {id:0, name:''})} onClose={() => setUnit('')}>
                        <div className="relative">
                        <ComboboxInput
                            displayValue={(unit: {name?: string}) => unit?.name || ''}
                            onChange={(event) => {
                                setUnit(event.target.value.trim())
                                showOption({unit: event.target.value.trim()})
                            }}
                            className="w-full rounded-md"
                        />
                        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                            <ArrowUnfold className="size-4 text-gray-500" />
                        </ComboboxButton>
                        </div>
                        
                        <ComboboxOptions
                        anchor="bottom start"
                        className="bg-white border border-gray-300 rounded-md"
                        >
                        {unit.trim().length > 0 && units.length == 0  && (
                        <ComboboxOption value={{ id: null, name: unit }} className="group flex text-sm cursor-default items-center gap-2 py-1.5 px-3 select-none data-[focus]:bg-primary-100">
                            Tambah satuan<span className="font-medium">"{unit}"</span>
                        </ComboboxOption>
                        )}
                        {units.map((unit) => (
                            <ComboboxOption
                            key={unit.id}
                            value={unit}
                            className="group flex cursor-default items-center gap-2 py-1.5 px-3 select-none data-[focus]:bg-primary-100"
                            >
                            {/* <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" /> */}
                            <div className="text-sm/6 text-black">{unit.name}</div>
                            </ComboboxOption>
                        ))}
                        </ComboboxOptions>
                    </Combobox>
                    {errors.unit && <p className="mt-1 text-xs text-red-600 ">{errors.unit}</p>}
                </div>
                <div className="max-w-screen-sm">
                    <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900">Barcode</label>
                    <input value={data.code} onChange={(e) => setData('code', e.target.value.trim())}  type="text" name="code" className="w-full rounded-md" />
                    {errors.code && <p className="mt-1 text-xs text-red-600 ">{errors.code}</p>}
                </div>
                <div className="max-w-screen-sm sm:col-span-2">
                    <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900">Deskripsi</label>
                    <textarea value={data.description} onChange={(e) => setData('description', e.target.value)}  name="description" className="w-full rounded-md bg-gray-50 border border-gray-300" ></textarea>
                    {errors.description && <p className="mt-1 text-xs text-red-600 ">{errors.description}</p>}
                </div>
                <div className="max-w-screen-sm sm:col-span-3 flex gap-2">
                    <Link href="/products" className="flex items-center btn-md gap-x-2 rounded-md bg-gray-500 hover:bg-gray-600 text-white shadow-md focus:ring-gray-200"><Back className="w-5 h-5"/>Kembali</Link>
                    <button type="submit" className="btn-md flex gap-2 rounded-md bg-primary-500 hover:bg-primary-600 text-white shadow-md focus:ring-primary-200"><Save className="w-5 h-5"/> Simpan</button>
                </div>
                
            </form>
        </AuthLayout>
    )
}