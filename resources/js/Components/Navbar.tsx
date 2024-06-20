import { Link } from "@inertiajs/react";
import { useState, useRef } from "react";

function Navbar() {
  const navbar = useRef()
  const navbarBtn = useRef()
  const [openNav, setOpenNav] = useState(false);
//   const [openFloat, setOpenFloat] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
        <div className="flex flex-wrap justify-between items-center">
            <Link href="/" className="p-1 flex items-center justify-between mr-4">
              <img
                src="https://flowbite.s3.amazonaws.com/logo.svg"
                className="mr-3 h-8"
                alt="Flowbite Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap">Stokku</span>
            </Link>
        </div>
    </nav>
  );
}

export default Navbar;