// components/Header.tsx
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // optional: install lucide-react icons

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-4">
        <h1 className="text-xl font-bold">Tender Platform</h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/">Home</Link>
          <Link href="/tender">Tenders</Link>
          <Link href="/companies">Companies</Link>
          <Link href="/Login">Login</Link>
          <Link href="/Register">Register</Link>
        </nav>

        {/* Mobile Icon */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-blue-600 px-4 pb-4 space-y-2">
          <Link href="/" onClick={toggleMenu} className="block">
            Home
          </Link>
          <Link href="/tender" onClick={toggleMenu} className="block">
            Tenders
          </Link>
          <Link href="/companies" onClick={toggleMenu} className="block">
            Companies
          </Link>
          <Link href="/Login" onClick={toggleMenu} className="block">
            Login
          </Link>
          <Link href="/Register" onClick={toggleMenu} className="block">
            Register
          </Link>
        </nav>
      )}
    </header>
  );
}
