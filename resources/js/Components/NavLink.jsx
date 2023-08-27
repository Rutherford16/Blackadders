import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-3 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'bg-gray-600 text-white'
                    : 'text-white hover:bg-gray-700') +
                className
            }
        >
            {children}
        </Link>
    );
}
