"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const isPsychologist = user?.role === 'psychologist';
  const isClient = user?.role === 'client';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4 flex-wrap">
        <Link href="/" className="flex items-center gap-3">
          {/* Icono con iniciales MHS */}
          <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">
            MHS
          </div>
          {/* Título actualizado */}
          <span className="font-bold text-xl text-primary">PsykologMiriamHeenSkotland</span>
        </Link>
        
        {/* Botón de Hamburguesa para móvil */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-dark focus:outline-none" aria-label={isMenuOpen ? "Lukk meny" : "Åpne meny"}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
            <span className="sr-only">{isMenuOpen ? "Lukk meny" : "Åpne meny"}</span>
          </button>
        </div>

        {/* Menú para escritorio (visible en md y superior) */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/about" className="text-dark hover:text-secondary">Om Meg</Link>
          <Link href="/services" className="text-dark hover:text-secondary">Tjenester</Link>
          <Link href="/contact" className="text-dark hover:text-secondary">Kontakt</Link>
        </div>
        <div className="hidden md:flex items-center gap-4">
            <a href="https://www.ledigpsykolog.no/miriam-heen-skotland/" target="_blank" rel="noopener noreferrer">
              <button className="bg-secondary text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-400">Bestill Time</button>
            </a>
            {isClient && <Link href="/dashboard" className="text-dark hover:text-secondary">Min Side</Link>}
            {isPsychologist && <Link href="/dashboard" className="text-dark hover:text-secondary">Psykolog-Dashboard</Link>}
            {user && <button onClick={logout} className="text-gray-600 hover:text-secondary">Logg Ut</button>}
        </div>

        {/* Menú desplegable para móvil */}
        <div className={`w-full md:hidden mt-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col items-start gap-4 pt-4 border-t border-gray-200">
            <Link href="/about" className="text-dark hover:text-secondary w-full">Om Meg</Link>
            <Link href="/services" className="text-dark hover:text-secondary w-full">Tjenester</Link>
            <Link href="/contact" className="text-dark hover:text-secondary w-full">Kontakt</Link>
            {isClient && <Link href="/dashboard" className="text-dark hover:text-secondary w-full">Min Side</Link>}
            {isPsychologist && <Link href="/dashboard" className="text-dark hover:text-secondary w-full">Psykolog-Dashboard</Link>}
            {user && <button onClick={logout} className="text-gray-600 hover:text-secondary text-left w-full">Logg Ut</button>}
            <a href="https://www.ledigpsykolog.no/miriam-heen-skotland/" target="_blank" rel="noopener noreferrer" className="w-full mt-2">
              <button className="bg-secondary text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-400 w-full">Bestill Time</button>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
