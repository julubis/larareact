import { ButtonHTMLAttributes, PropsWithChildren } from "react";

export default function Button({className = '', children, size = 'md', colorScheme = 'primary',  disabled, ...props} :
    ButtonHTMLAttributes<HTMLButtonElement> & 
    PropsWithChildren<{
        size: 'sm' | 'md' | 'lg', 
        colorScheme: 'primary' | 'secondary'
    }>) {
    const sizes = {
        sm: 'btn-sm',
        md: 'btn-md',
        lg: 'btn-lg',
    }
    const colors = {
        primary: `bg-primary-500 hover:bg-primary-600 focus:ring-primary-200`
    } 

    return (
        <button 
            {...props}
            className={`text-white rounded-lg ${sizes[size]}`}
        >
            {children}
        </button>
    )
}