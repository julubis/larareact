import { Back, Save } from "@/Components/Icons";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";

const people = [
    { id: 1, name: 'Tom Cook' },
    { id: 2, name: 'Wade Cooper' },
    { id: 3, name: 'Tanya Fox' },
    { id: 4, name: 'Arlene Mccoy' },
    { id: 5, name: 'Devon Webb' },
  ]  

export default function AddProduct() {
    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState(people[1])

    const filteredPeople =
        query === ''
        ? people
        : people.filter((person) => {
            return person.name.toLowerCase().includes(query.toLowerCase())
            })
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        category: '',
        unit: '',
        price: '',
        upc: '',
        description: ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('products.add'));
    };

    return (
        <>
            <h2 className="font-semibold text-gray-800 text-2xl mb-6 pt-3">Tambah Barang Baru</h2>
            <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4 bg-white p-4 rounded-md">
                <div className="max-w-screen-sm">
                    <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900 after:content-['*'] after:text-red-500">Nama Barang</label>
                    <input value={data.name} onChange={(e) => setData('name', e.target.value)}  type="text" name="name" className="w-full rounded-md" autoFocus required />
                </div>
                <div className="max-w-screen-sm">
                    <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900 after:content-['*'] after:text-red-500">Kategori</label>
                    <input value={data.category} onChange={(e) => setData('category', e.target.value)}  type="text" name="category" className="w-full rounded-md" />
                </div>
                <div className="max-w-screen-sm">
                    <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900 after:content-['*'] after:text-red-500">Satuan</label>
                    <Combobox value={selected} onChange={(value) => setSelected({id: value?.id||0, name: value?.name||''})} onClose={() => setQuery('')}>
                        <div className="relative">
                        <ComboboxInput
                        
                            displayValue={(person: {name: string}) => person?.name}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                            {/* <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" /> */}
                        </ComboboxButton>
                        </div>

                        <ComboboxOptions
                        anchor="bottom"
                        >
                        {filteredPeople.map((person) => (
                            <ComboboxOption
                            key={person.id}
                            value={person}
                            className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                            >
                            {/* <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" /> */}
                            <div className="text-sm/6 text-white">{person.name}</div>
                            </ComboboxOption>
                        ))}
                        </ComboboxOptions>
                    </Combobox>
                    <input value={data.unit} onChange={(e) => setData('unit', e.target.value)}  type="text" name="unit" className="w-full rounded-md" />
                </div>
                <div className="max-w-screen-sm">
                    <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900 after:content-['*'] after:text-red-500">Harga (Rp)</label>
                    <input value={data.price} onChange={(e) => setData('price', e.target.value)}  type="number" name="price" className="w-full rounded-md" />
                </div>
                <div className="max-w-screen-sm">
                    <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900">UPC</label>
                    <input value={data.upc} onChange={(e) => setData('upc', e.target.value)}  type="text" name="upc" className="w-full rounded-md" />
                </div>
                <div className="max-w-screen-sm sm:col-span-2">
                    <label htmlFor="" className="block mb-1 text-sm font-medium text-gray-900">Deskripsi</label>
                    <textarea value={data.description} onChange={(e) => setData('description', e.target.value)}  name="description" className="w-full rounded-md bg-gray-50 border border-gray-300" ></textarea>
                </div>
                <div className="max-w-screen-sm sm:col-span-3 flex gap-2">
                    <Link href="/products" className="flex gap-2 mb-2 text-black border border-gray-300 bg-white hover:text-white hover:bg-primary-500 focus:ring focus:outline-none focus:border-none focus:ring-primary-200 font-medium rounded-md text-sm px-5 py-2.5 text-center"><Back className="w-5 h-5"/>Kembali</Link>
                    <button type="submit" className="flex gap-2 mb-2 text-white bg-primary-500 hover:bg-primary-600 focus:ring focus:outline-none focus:border-none focus:ring-primary-200 font-medium rounded-md text-sm px-5 py-2.5 text-center disabled:cursor-not-allowed disabled:bg-primary-400"><Save className="w-5 h-5"/> Simpan</button>
                </div>
                
            </form>
        </>
    )
}