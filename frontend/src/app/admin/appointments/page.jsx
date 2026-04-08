"use client";

import { useMemo, useState } from "react";

const appointmentsData = [
    {
        id: 1,
        client: "Sophie Martin",
        service: "Coupe femme",
        employee: "Laura",
        date: "2026-04-09",
        time: "09:30",
        status: "confirmé",
    },
    {
        id: 2,
        client: "Thomas Bernard",
        service: "Barbe + coupe",
        employee: "Nadia",
        date: "2026-04-09",
        time: "11:00",
        status: "en attente",
    },
    {
        id: 3,
        client: "Julie Robert",
        service: "Coloration",
        employee: "Sonia",
        date: "2026-04-10",
        time: "14:30",
        status: "annulé",
    },
    {
        id: 4,
        client: "Alex Dupont",
        service: "Coupe homme",
        employee: "Laura",
        date: "2026-04-10",
        time: "16:00",
        status: "confirmé",
    },
    {
        id: 5,
        client: "Camille Leroy",
        service: "Brushing",
        employee: "Nadia",
        date: "2026-04-11",
        time: "10:15",
        status: "terminé",
    },
    {
        id: 6,
        client: "Manon Petit",
        service: "Balayage",
        employee: "Sonia",
        date: "2026-04-11",
        time: "13:45",
        status: "en attente",
    },
];

export default function AdminAppointmentsPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("tous");
    const [employeeFilter, setEmployeeFilter] = useState("tous");
    const [dateFilter, setDateFilter] = useState("");

    const employees = useMemo(() => {
        return [...new Set(appointmentsData.map((appointment) => appointment.employee))];
    }, []);

    const filteredAppointments = useMemo(() => {
        return appointmentsData.filter((appointment) => {
            const matchesSearch = 
                appointment.client.toLowerCase().includes(search.toLowerCase()) ||
                appointment.service.toLowerCase().includes(search.toLowerCase());

            const matchesStatus = 
                statusFilter === "tous" || appointment.status === statusFilter;

            const matchesEmployee =
                employeeFilter === "tous" || appointment.employee === employeeFilter;

            const matchesDate = !dateFilter || appointment.date === dateFilter;

            return matchesSearch && matchesStatus && matchesEmployee && matchesDate;
        });
    }, [search, statusFilter, employeeFilter, dateFilter]);

    const stats = useMemo(() => {
        return {
            total: appointmentsData.length,
            confirmed: appointmentsData.filter(
                (appointment) => appointment.status === "confirmé"
            ).length,
            pending: appointmentsData.filter(
                (appointment) => appointment.status === "en attente"
            ).length,
            cancelled: appointmentsData.filter(
                (appointment) => appointment.status === "annulé"
            ).length,
        };
    }, []);

    function getStatusClasses(status) {
        switch (status) {
            case "confirmé":
                return "bg-green-100 text-green-700";
            case "en attente":
                return "bg-yellow-100 text-yellow-700";
            case "annulé":
                return "bg-red-100 text-red-700";
            case "terminé":
                return "bg-blue-100 text-blue-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    }

    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }

    return (
        <div className="space-y-6">
            <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Rendez-vous</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Gérez les rendez-vous du salon, suivez leur statut et préparez
                        l'intégration future avec l'API.
                    </p>
                </div>

                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
                >
                    Nouveau rendez-vous
                </button>
            </header>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <p className="text-sm text-gray-500">Confirmés</p>
                    <p className="mt-2 text-3xl font-bold text-green-600">
                        {stats.confirmed}
                    </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <p className="text-sm text-gray-500">En attente</p>
                    <p className="mt-2 text-3xl font-bold text-yellow-600">
                        {stats.pending}
                    </p>
                </div>
                
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <p className="text-sm text-gray-500">Annulés</p>
                    <p className="mt-2 text-3xl font-bold text-red-600">
                        {stats.cancelled}
                    </p>
                </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div>
                        <label
                            htmlFor="search"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Recherche
                        </label>
                        <input
                            id="search"
                            type="text"
                            placeholder="Client ou prestation"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-900"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="status"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Statut
                        </label>
                        <select 
                            id="status"
                            value={statusFilter}
                            onChange={(event) => setStatusFilter(event.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-900"
                        >
                            <option value="tous">Tous</option>
                            <option value="confirmé">Confirmé</option>
                            <option value="en attente">En attente</option>
                            <option value="annulé">Annulé</option>
                            <option value="terminé">Terminé</option>
                        </select>
                    </div>
                    
                    <div>
                        <label
                            htmlFor="employee"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Employé
                        </label>
                        <select
                            id="employee"
                            value={employeeFilter}
                            onChange={(event) => setEmployeeFilter(event.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-900"
                        >
                            <option value="tous">Tous</option>
                            {employees.map((employee) => (
                                <option key={employee} value={employee}>
                                    {employee}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="date"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Date
                        </label>
                        <input
                            id="date"
                            type="date"
                            value={dateFilter}
                            onChange={(event) => setDateFilter(event.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-900"
                        />
                    </div>
                </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-5 py-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Liste des rendez-vous
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        {filteredAppointments.length} rendez-vous affiché
                        {filteredAppointments.length > 1 ? "s" : ""}
                    </p>
                    </div>

                    <div className="hidden overflow-x-auto lg:block">
                    <table className="min-w-full">
                        <thead className="bg-gray-50 text-left text-sm text-gray-500">
                        <tr>
                            <th className="px-5 py-4 font-medium">Client</th>
                            <th className="px-5 py-4 font-medium">Prestation</th>
                            <th className="px-5 py-4 font-medium">Employé</th>
                            <th className="px-5 py-4 font-medium">Date</th>
                            <th className="px-5 py-4 font-medium">Heure</th>
                            <th className="px-5 py-4 font-medium">Statut</th>
                            <th className="px-5 py-4 font-medium text-right">Actions</th>
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                        {filteredAppointments.length > 0 ? (
                            filteredAppointments.map((appointment) => (
                            <tr key={appointment.id} className="text-sm text-gray-700 transition hover:bg-gray-50">
                                <td className="px-5 py-4 font-medium text-gray-900">
                                {appointment.client}
                                </td>
                                <td className="px-5 py-4">{appointment.service}</td>
                                <td className="px-5 py-4">{appointment.employee}</td>
                                <td className="px-5 py-4">
                                {formatDate(appointment.date)}
                                </td>
                                <td className="px-5 py-4">{appointment.time}</td>
                                <td className="px-5 py-4">
                                <span
                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                                    appointment.status
                                    )}`}
                                >
                                    {appointment.status}
                                </span>
                                </td>
                                <td className="px-5 py-4">
                                <div className="mt-4 flex items-center justify-end gap-2">
                                    <button
                                    type="button"
                                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                                    >
                                    Voir
                                    </button>
                                    <button
                                    type="button"
                                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                                    >
                                    Modifier
                                    </button>
                                </div>
                                </td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                            <td colSpan="7" className="px-5 py-10">
                                <div className="flex flex-col items-center justify-center text-center">
                                    <p className="text-sm font-medium text-gray-700">
                                        Aucun rendez-vous trouvé
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Essaie de modifier les filters pour afficher d'autres résultats.
                                    </p>
                                </div>
                            </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    </div>

                    <div className="grid gap-4 p-5 lg:hidden">
                        {filteredAppointments.length > 0 ? (
                            filteredAppointments.map((appointment) => (
                                <article
                                    key={appointment.id}
                                    className="rounded-2xl border border-gray-200 p-4"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-900">
                                        {appointment.client}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                        {appointment.service}
                                        </p>
                                    </div>

                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                                        appointment.status
                                        )}`}
                                    >
                                        {appointment.status}
                                    </span>
                                    </div>

                                    <div className="mt-4 grid gap-2 text-sm text-gray-600">
                                    <p>
                                        <span className="font-medium text-gray-900">Employé :</span>{" "}
                                        {appointment.employee}
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-900">Date :</span>{" "}
                                        {formatDate(appointment.date)}
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-900">Heure :</span>{" "}
                                        {appointment.time}
                                    </p>
                                    </div>

                                    <div className="mt-4 flex gap-2">
                                    <button
                                        type="button"
                                        className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                                    >
                                        Voir
                                    </button>
                                    <button
                                        type="button"
                                        className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                                    >
                                        Modifier
                                    </button>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <p className="text-sm font-medium text-gray-700">
                                Aucun rendez-vous trouvé
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    Essaie de modifier les filtres pour afficher d'autres résultats.
                                </p>
                            </div>
                        )}
                </div>
            </section>
        </div>
    );
}