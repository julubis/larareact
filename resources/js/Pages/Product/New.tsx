import { Back, Save } from "@/Components/Icons";
import { Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { PageProps } from "@/types";
import AuthLayout from "@/Layouts/AuthLayout";
import ComboboxSelect from "@/Components/ComboboxSelect";
import TextInput from "@/Components/TextInput";
import Button from "@/Components/Button";
import Textarea from "@/Components/Textarea";

export default function New({ auth, categories, units, barcode }: PageProps & {
    categories: {id: number, name: string}[],
    units: {id: number, name: string}[],
    barcode: string
} ) {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category: {id: 0, name: ''},
        unit: {id: 0, name: ''},
        price: '0',
        code: barcode,
        description: ''
    });

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
                    <TextInput
                        label="Nama Barang"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        errorMsg={errors.name}
                        required
                        autoFocus
                    />
                </div>
                <div className="max-w-screen-sm">
                    <TextInput
                        label="Harga (Rp)"
                        value={data.price}
                        type="number"
                        onChange={(e) => setData('price', e.target.value)}
                        errorMsg={errors.price}
                        required
                    />
                </div>
                <div className="max-w-screen-sm">
                    <ComboboxSelect 
                        label="Kategori"
                        id="category"
                        errorMsg={errors.category}
                        options={categories}
                        value={data.category} 
                        onChange={(value) => setData('category', {id: value.id, name: value.name})}
                    />
                </div>
                <div className="max-w-screen-sm">
                    <ComboboxSelect 
                        label="Satuan"
                        id="unit"
                        errorMsg={errors.unit}
                        options={units}
                        value={data.unit} 
                        onChange={(value) => setData('unit', {id: value.id, name: value.name})}
                    />
                </div>
                <div className="max-w-screen-sm">
                    <TextInput
                        label="Barcode"
                        value={data.code}
                        type="number"
                        onChange={(e) => setData('code', e.target.value)}
                        errorMsg={errors.code}
                    />
                </div>
                <div className="max-w-screen-sm sm:col-span-2">
                    <Textarea
                        label="Deskripsi"
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        errorMsg={errors.description}
                    />
                </div>
                <div className="max-w-screen-sm sm:col-span-3 flex gap-2">
                    <Link href="/products" className="btn secondary"><Back className="w-5 h-5"/>Kembali</Link>
                    <Button type="submit" icon={<Save className="w-5 h-5"/>} disabled={processing}>Simpan</Button>
                </div>
            </form>
        </AuthLayout>
    )
}