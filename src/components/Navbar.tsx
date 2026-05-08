"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/lib/cart";
import {
  ShoppingBag,
  User,
  Menu,
  X,
  Scissors,
  Search,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const totalItems = useCartStore((s) => s.totalItems);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      {/* Top banner */}
      <div className="bg-gray-900 text-white text-center py-2 text-xs tracking-widest uppercase">
        Livraison offerte dès 150€ d&apos;achat — Retouches express sous 48h
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-[0.2em] uppercase text-gray-900">
              Maelstrom
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/boutique"
              className="text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900 transition-colors"
            >
              Boutique
            </Link>
            <Link
              href="/boutique?category=robes"
              className="text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900 transition-colors"
            >
              Robes
            </Link>
            <Link
              href="/boutique?category=vestes"
              className="text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900 transition-colors"
            >
              Vestes & Manteaux
            </Link>
            <Link
              href="/services"
              className="text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              <Scissors size={14} />
              Retouches
            </Link>
            <Link
              href="/a-propos"
              className="text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900 transition-colors"
            >
              Notre Histoire
            </Link>
          </div>

          {/* Right icons */}
          <div className="flex items-center space-x-4">
            <button className="hidden sm:block p-2 text-gray-600 hover:text-gray-900" aria-label="Rechercher">
              <Search size={20} />
            </button>
            {session ? (
              <div className="relative group">
                <button className="p-2 text-gray-600 hover:text-gray-900">
                  <User size={20} />
                </button>
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {session.user?.name || session.user?.email}
                    </p>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                  >
                    Se déconnecter
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <User size={20} />
              </Link>
            )}
            <Link
              href="/panier"
              className="relative p-2 text-gray-600 hover:text-gray-900"
            >
              <ShoppingBag size={20} />
              {totalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {totalItems()}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 space-y-3">
            <Link
              href="/boutique"
              onClick={() => setIsOpen(false)}
              className="block px-2 py-2 text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900"
            >
              Boutique
            </Link>
            <Link
              href="/boutique?category=robes"
              onClick={() => setIsOpen(false)}
              className="block px-2 py-2 text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900"
            >
              Robes
            </Link>
            <Link
              href="/boutique?category=vestes"
              onClick={() => setIsOpen(false)}
              className="block px-2 py-2 text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900"
            >
              Vestes & Manteaux
            </Link>
            <Link
              href="/services"
              onClick={() => setIsOpen(false)}
              className="block px-2 py-2 text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900"
            >
              <Scissors size={14} className="inline mr-1" />
              Retouches
            </Link>
            <Link
              href="/a-propos"
              onClick={() => setIsOpen(false)}
              className="block px-2 py-2 text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900"
            >
              Notre Histoire
            </Link>
            {!session && (
              <Link
                href="/auth/login"
                onClick={() => setIsOpen(false)}
                className="block px-2 py-2 text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900"
              >
                Se connecter
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
