"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/appointments", label: "Rendez-vous" },
    { href: "/admin/availabilities", label: "Disponibilités" },
    { href: "/admin/employees", label: "Employés" },
];

export default function AdminLayout({ children }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <div className="flex min-h-screen">
                <aside className="hidden w-72 flex-col border-r border-gray-200 bg-white lg:flex">
                    <div className="border-b border-gray-200 px-6 py-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                            BarberBook
                        </p>
                        <h1 className="mt-2 text-2xl font-bold">Admin</h1>
                    </div>

                    <nav className="flex-1 space-y-2 p-4">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                                        isActive
                                            ? "bg-gray-900 text-white"
                                            : "text-gray-700 hover:bg-gray-100" 
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="border-t border-gray-200 p-4">
                        <p className="text-xs text-gray-500">
                            Interface d'administration BarberBook
                        </p>
                    </div>
                </aside>

                <div className="flex min-h-screen flex-1 flex-col">
                    <header className="border-b border-gray-200 bg-white px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Espace administrateur</p>
                                <h2 className="text-wl font-semibold text-gray-900">
                                    Gestion du salon
                                </h2>
                            </div>

                            <Link
                                href="/"
                                className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Retour au site
                            </Link>
                        </div>
                    </header>

                    <main className="flex-1 p-6">{children}</main>
                </div>
            </div>
        </div>
    );
}