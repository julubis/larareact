import { ArrowUnfold, Back, Pencil, Save, Trash } from "@/Components/Icons";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps } from "@/types";
import { Link, router, useForm } from "@inertiajs/react";
import { FormEventHandler, useRef, useState } from "react";

interface Product {
    id: number
    name: string
    category: {
        id: number,
        name: string
    }
    stock: number
    unit: {
        id: number,
        name: string
    }
    code: string
    price: number | string
    description?: string
}

export default function Detail({ auth, product, categories, units }: PageProps & {
    product: Product, categories: {id: number, name: string}[],
    units: {id: number, name: string}[]
}) {
    const [isEdit, setIsEdit] = useState(false);
    const { data, setData, put, processing, errors, reset } = useForm({
        name: product.name,
        category: {id: product.category.id, name: product.category.name},
        unit: {id: product.unit.id, name: product.unit.name},
        price: product.price,
        code: product.code || '',
        description: product.description
    });

    const [category, setCategory] = useState('');
    const [unit, setUnit] = useState('');
    const debounce = useRef<number | undefined>();

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
        put(route('products.edit', {id: `B${product.id.toString().padStart(3, '0')}`}));
    };

    return (
        <AuthLayout user={auth.user}>
            <h2 className="font-semibold text-gray-800 text-2xl mb-6">Detail Barang</h2>
            <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4 bg-white p-4 rounded-md">
                <div className="sm:col-span-2 md:col-span-3">
                    <p className="text-xl font-medium mb-2">Informasi Barang</p>
                    <hr className="border border-gray-200"/>
                </div>
                <div className="max-w-screen-sm">
                    <label htmlFor="" className={`block mb-1 text-sm font-medium text-gray-600 ${isEdit && "after:content-['*'] after:text-red-500"}`}> Nama Barang</label>
                    {isEdit ? <input value={data.name} onChange={(e) => setData('name', e.target.value)} type="text" name="name" className="w-full rounded-md" autoFocus /> : <p className="w-full text-lg text-gray-900">{product.name}</p>}
                    {errors.name && <p className="mt-1 text-xs text-red-600 ">{errors.name}</p>}
                </div>
                <div className="max-w-screen-sm">
                    <label htmlFor="" className={`block mb-1 text-sm font-medium text-gray-600 ${isEdit && "after:content-['*'] after:text-red-500"}`}>Harga</label>
                    {isEdit ? <input value={data.price} onChange={(e) => setData('price', e.target.value)} type="number" name="price" className="w-full rounded-md" /> : <p className="w-full text-lg text-gray-900">{product.price.toLocaleString('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0})}</p>}
                    {errors.price && <p className="mt-1 text-xs text-red-600 ">{errors.price}</p>}
                </div>
                <div className="max-w-screen-sm">
                    <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-600">Kategori</label>
                    {isEdit ? <Combobox value={data.category} onChange={(value) => setData('category', value ? {id: value.id, name: value?.name || ''}: {id: 0, name: ''})} onClose={() => setCategory('')}>
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
                        {category.length !== 0 && category.trim().toLowerCase() !== categories[0]?.name.toLowerCase() && (
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
                    </Combobox> : <p className="w-full text-lg text-gray-900">{product.category.name || '-'}</p>}
                    {errors.category && <p className="mt-1 text-xs text-red-600 ">{errors.category}</p>}
                </div>
                <div className="max-w-screen-sm">
                    <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-600">Satuan</label>
                    {isEdit ? <Combobox value={data.unit} onChange={(value) => setData('unit', value ? {id: value.id, name: value.name} : {id: 0, name: ''})} onClose={() => setUnit('')}>
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
                        {unit.length !== 0 && unit.trim().toLowerCase() !== units[0]?.name.toLowerCase() && (
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
                    </Combobox> : <p className="w-full text-lg text-gray-900">{product.unit.name || '-'}</p>}
                    {errors.unit && <p className="mt-1 text-xs text-red-600 ">{errors.unit}</p>}
                </div>
                <div className="max-w-screen-sm">
                    <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-600">Barcode</label>
                    {isEdit ? <input value={data.code} onChange={(e) => setData('code', e.target.value.trim())} type="text" name="name" className="w-full rounded-md" autoFocus /> :  <p className="w-full text-lg text-gray-900">{product.code || '-'}</p>}
                    {errors.code && <p className="mt-1 text-xs text-red-600 ">{errors.code}</p>}
                </div>
                <div className="max-w-screen-sm">
                    {!isEdit && <><label htmlFor="" className="block mb-1 text-sm font-medium text-gray-600">Stok</label>
                    <p className="w-full text-lg text-gray-900">{product.stock}</p></>}
                </div>
                <div className="max-w-screen-sm sm:col-span-2">
                    <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-600 ">Deskripsi</label>
                    {isEdit ? <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} name="description" cols={5} className="w-full min-h-24 rounded-md text-sm border border-gray-300 bg-slate-50"></textarea> : <p className="w-full text-lg text-gray-900">{product.description || '-'}</p>}
                    {errors.description && <p className="mt-1 text-xs text-red-600 ">{errors.description}</p>}
                </div>
                <div className="max-w-screen-sm sm:col-span-3 flex gap-2">
                {!isEdit && (
                        <>
                        <button onClick={() => setIsEdit(true)} className="flex items-center btn-md gap-x-2 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white shadow-md focus:ring-yellow-200"><Pencil className="w-5 h-5"/>Edit</button>
                        <Link href={`/products/B${product.id.toString().padStart(3, '0')}`} as="button" method="delete" className="flex items-center btn-md gap-x-2 rounded-md bg-red-500 hover:bg-red-600 text-white shadow-md focus:ring-red-200"><Trash className="h-5 w-5"/>Hapus</Link>
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