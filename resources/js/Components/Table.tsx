import { TableHeader } from "@/types";
import { PropsWithChildren, ReactNode, useState } from "react";
import { ArrowDown, ArrowUnfold, ArrowUp } from "./Icons";
import { router, usePage, } from "@inertiajs/react";

export default function Table({header, body, ...props}: PropsWithChildren<{header: TableHeader[], body: ReactNode[][]}>) {
    const { filters } = usePage<{
        filters: { col?: string; sort?: string };
      }>().props;
    
    const [values, setValues] = useState(filters);
    
    const setSort = (col: string) => {
        const data = values;
        if (col === data.col) {
            if (data.sort === 'desc') {
                data.col = '';
                data.sort = '';
            } else {
                data.sort = 'desc';
            }
        } else {
            data.col = col;
            data.sort = 'asc';
        }
        setValues(data)
        router.get('', values, {preserveState: true})
    }

    return (
        <div className="relative overflow-x-auto border border-gray-200 rounded-lg mb-2">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                        {header.map(head => <th scope="col" className="px-6 py-3">
                            {
                                head.sortable && head.name ? 
                                <button onClick={() => setSort(head.name || '')} className="uppercase items-center flex gap-2">
                                    {head.label}
                                    {
                                        values?.col === head.name && values?.sort === 'asc' ?
                                        <ArrowUp className="w-5 h-5 text-gray-700"/> : values?.col === head.name && values?.sort === 'desc' ?
                                        <ArrowDown className="w-5 h-5 text-gray-700"/> : <ArrowUnfold  className="w-5 h-5 text-gray-400"/>
                                    }
                                </button> :
                                head.label
                            }
                        </th>)}
                    </tr>
                </thead>
                <tbody>
                    {body.map(rows => {
                        return (
                            <tr className="bg-white border-b hover:bg-gray-50">
                            {rows.map(data => <td className="px-6 py-4 text-gray-800">{data}</td>)}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}