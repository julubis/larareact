import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Layout({children} : PropsWithChildren) {
    return (
        <>
        <main>
            {children}
        </main>
        </>
    )
}