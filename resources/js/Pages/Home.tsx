import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps } from "@/types";

export default function Home({ auth }: PageProps) {
    return (
        <AuthLayout user={auth.user}>
            <button>{auth.user.name}</button>
        </AuthLayout>
    )
}