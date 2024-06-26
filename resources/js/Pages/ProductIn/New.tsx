import { Add, ArrowUnfold, Save, Trash } from "@/Components/Icons";
import { router, useForm } from "@inertiajs/react";
import { FormEventHandler, ReactNode, useRef, useState } from "react";
import { PageProps } from "@/types";
import AuthLayout from "@/Layouts/AuthLayout";
import Table from "@/Components/Table";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";

interface Product {
    id: number
    name: string
    price: number | string
    quantity: number | string
}

export default function New({ auth, products, distributors }: PageProps & 
    {
        products: {id: number, name: string, stock: number}[],
        distributors: {id: number, name: string}[],
}) {
    const { data, setData, post, processing, errors, reset } = useForm<{date: string, distributor: {id: string, name: string}, products: Product[], 'distributor.id': null}>({
        date: '',
        distributor: {
            id: '',
            name: ''
        },
        products: [],
        'distributor.id': null
    });
    // const [selectedProduct, setSelectedProduct] = useState('');
    // const [selectedDistributor, setSelectedDistributor] = useState('');
    const debounce = useRef<number | undefined>();

    const [product, setProduct] = useState<Product>({
        id: 0,
        name: '',
        price: '0',
        quantity: '1'
    })
    const [productList, setProductList] = useState<Product[]>([]);

    const addProduct = () => {
        let isUpdate = false
        const newList = [...productList]
        for (let i = 0; i < newList.length; i++) {
            if (newList[i].id === product.id) {
                newList[i].name = product.name
                newList[i].price = product.price
                newList[i].quantity = product.quantity
                isUpdate = true
            }
        }
        if (!isUpdate){
            setProductList([...productList, product]);
            setData('products', [...productList, product]);
        } else {
            setProductList([...newList]);
            setData('products', [...newList])
        }
    }

    const deleteProduct = (name: string) => {
        const newList = [...productList]
        productList.forEach((list, i) => {
            if (list.name === name) newList.splice(i, 1);
        })
        setProductList(newList)
    }

    const addProductHandle: FormEventHandler = (e) => {
        e.preventDefault();
        addProduct();
        setProduct({
            id: 0,
            name: '',
            price: '0',
            quantity: '1'
        })
    }

    const submit = () => {
        post(route('product-in.add'));
    };

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

    return (
        <AuthLayout user={auth.user}>
            <h2 className="font-semibold text-gray-800 text-2xl mb-6 pt-3">Tambah Barang Masuk</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex w-full flex-col gap-3 bg-white p-4 rounded-md">
                    <div className="w-full">
                        <p className="text-xl font-medium mb-2">Informasi Transaksi</p>
                        <hr className="border border-gray-200"/>
                    </div>
                    <div className="w-full">
                        <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900 after:content-['*'] after:text-red-500">Tanggal</label>
                        <input value={data.date} onChange={(e) => setData('date', e.target.value)}  type="date" name="date" className="w-full rounded-md" autoFocus required />
                        {errors.date && <p className="mt-1 text-xs text-red-600 ">{errors.date}</p>}
                    </div>
                    <div className="w-full mb-3">
                        <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900 after:content-['*'] after:text-red-500">Distributor</label>
                        <Combobox value={data.distributor} onChange={(value) => setData('distributor', {id: value?.id || '', name: value?.name || ''})}>
                            <div className="relative">
                            <ComboboxInput
                                displayValue={(data: {name?: string}) => data?.name || ''}
                                onChange={(event) => {
                                    showOption({distributor: event.target.value.trim()})
                                }}
                                className="w-full rounded-md"
                                placeholder="Pilih distributor"
                            />
                            <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                                <ArrowUnfold className="size-4 text-gray-500" />
                            </ComboboxButton>
                            </div>
                            
                            <ComboboxOptions
                            anchor="bottom start"
                            className="bg-white border border-gray-300 rounded-md"
                            >
                            {distributors.map((distributor) => (
                                <ComboboxOption
                                key={distributor.id}
                                value={distributor}
                                className="group flex cursor-default items-center gap-2 py-1.5 px-3 select-none data-[focus]:bg-primary-100"
                                >
                                {/* <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" /> */}
                                <div className="text-sm/6 text-black">{distributor.name}</div>
                                </ComboboxOption>
                            ))}
                            </ComboboxOptions>
                        </Combobox>
                        {errors['distributor.id'] && <p className="mt-1 text-xs text-red-600 ">{errors['distributor.id']}</p>}
                    </div>
                    <div className="sm:col-span-2 md:col-span-3">
                        <p className="text-xl font-medium mb-2">Data Barang</p>
                        <hr className="border border-gray-200"/>
                    </div>
                    <form onSubmit={addProductHandle} className="space-y-2">
                        <div className="w-full">
                            <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900 after:content-['*'] after:text-red-500">Nama Barang</label>
                            <Combobox value={product} onChange={(value) => setProduct({...product, id: value?.id || 0, name: value?.name || ''})}>
                                <div className="relative">
                                <ComboboxInput
                                    displayValue={(product: {name?: string}) => product?.name || ''}
                                    onChange={(event) => {
                                        showOption({product: event.target.value.trim()})
                                    }}
                                    className="w-full rounded-md"
                                    placeholder="Pilih barang"
                                />
                                <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                                    <ArrowUnfold className="size-4 text-gray-500" />
                                </ComboboxButton>
                                </div>
                                
                                <ComboboxOptions
                                anchor="bottom start"
                                className="bg-white border border-gray-300 rounded-md"
                                >
                                {products.map((product) => (
                                    <ComboboxOption
                                    key={product.id}
                                    value={product}
                                    className="group flex cursor-default items-center gap-2 py-1.5 px-3 select-none data-[focus]:bg-primary-100"
                                    >
                                    {/* <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" /> */}
                                    <div className="text-sm/6 text-black">{product.name}</div>
                                    </ComboboxOption>
                                ))}
                                </ComboboxOptions>
                            </Combobox>
                            
                        </div>
                        <div className="w-full">
                            <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900 after:content-['*'] after:text-red-500">Harga Beli</label>
                            <input value={product.price} min={0} onChange={(e) => setProduct({...product, price: Number(e.target.value) || ''})} type="number" name="price" className="w-full rounded-md" required />
                        </div>
                        <div className="w-full mb-3">
                            <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900 after:content-['*'] after:text-red-500">Jumlah</label>
                            <input value={product.quantity} min={1} onChange={(e) => setProduct({...product, quantity: Number(e.target.value) || ''})} type="number" name="quantity" className="w-full rounded-md" required />
                        </div>
                        <div className="w-full">
                            <button type="submit" className="w-full btn-md justify-center flex gap-2 rounded-md bg-primary-500 hover:bg-primary-600 text-white shadow-md focus:ring-primary-200"><Add className="w-5 h-5"/> Tambah</button>
                        </div>
                    </form>
                    
                    
                </div>
                <div className="flex flex-col bg-white p-4 rounded-md md:col-span-2">
                    <div className="w-full mb-2">
                        <p className="text-xl font-medium mb-2">Daftar Barang Masuk</p>
                        <hr className="border border-gray-200"/>
                    </div>
                    <div className="w-full">
                        <Table 
                            header={[{label: 'Nama Barang'}, {label: 'Jumlah'}, {label: 'Harga'}, {label: 'Total Harga'}, {label: ''}]}
                            body={productList.map(list => [
                                list.name,
                                list.quantity,
                                Number(list.price).toLocaleString('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0}),
                                (Number(list.price) * Number(list.quantity)).toLocaleString('id-ID', {style: 'currency', currency: 'IDR', minimumFractionDigits: 0}),
                                <button className="text-red-500" onClick={() => deleteProduct(list.name)}><Trash className="w-5 h-5"/></button>
                            ])}
                        ></Table>
                    </div>
                    <div className="">
                        {productList.length > 0 && <button onClick={submit} type="button" className="btn-md justify-center flex gap-2 rounded-md bg-primary-500 hover:bg-primary-600 text-white shadow-md focus:ring-primary-200"><Save className="w-5 h-5"/>Simpan</button>}
                    </div>
                    
                </div>
            </div>
            
        </AuthLayout>
    )
}