"use client";

import { useMemo, useState } from "react";

const employeesData = [
  {
    id: 1,
    name: "Laura Dupont",
    role: "Coiffeuse",
    email: "laura@barberbook.com",
    phone: "06 12 34 56 78",
    status: "actif",
  },
  {
    id: 2,
    name: "Nadia Benali",
    role: "Coiffeuse",
    email: "nadia@barberbook.com",
    phone: "06 98 76 54 32",
    status: "actif",
  },
  {
    id: 3,
    name: "Sonia Martin",
    role: "Manager",
    email: "sonia@barberbook.com",
    phone: "06 11 22 33 44",
    status: "inactif",
  },
  {
    id: 4,
    name: "Thomas Leroy",
    role: "Barbier",
    email: "thomas@barberbook.com",
    phone: "06 45 67 89 10",
    status: "actif",
  },
  {
    id: 5,
    name: "Camille Robert",
    role: "Réception",
    email: "camille@barberbook.com",
    phone: "06 22 33 44 55",
    status: "inactif",
  },
  {
    id: 6,
    name: "Julie Bernard",
    role: "Coiffeuse",
    email: "julie@barberbook.com",
    phone: "06 55 66 77 88",
    status: "actif",
  },
];

export default function AdminEmployeesPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("tous");
  const [statusFilter, setStatusFilter] = useState("tous");

  const roles = useMemo(() => {
    return [...new Set(employeesData.map((employee) => employee.role))];
  }, []);

  const filteredEmployees = useMemo(() => {
    return employeesData.filter((employee) => {
      const matchesSearch =
        employee.name.toLowerCase().includes(search.toLowerCase()) ||
        employee.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole =
        roleFilter === "tous" || employee.role === roleFilter;

      const matchesStatus =
        statusFilter === "tous" || employee.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [search, roleFilter, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: employeesData.length,
      active: employeesData.filter((employee) => employee.status === "actif")
        .length,
      inactive: employeesData.filter(
        (employee) => employee.status === "inactif"
      ).length,
    };
  }, []);

  function getStatusClasses(status) {
    switch (status) {
      case "actif":
        return "bg-green-100 text-green-700";
      case "inactif":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  function getRoleClasses(role) {
    switch (role) {
      case "Manager":
        return "bg-purple-100 text-purple-700";
      case "Barbier":
        return "bg-blue-100 text-blue-700";
      case "Coiffeuse":
        return "bg-pink-100 text-pink-700";
      case "Réception":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employés</h1>
          <p className="mt-2 text-sm text-gray-600">
            Gérez l’équipe du salon, visualisez les rôles et préparez
            l’intégration future avec les disponibilités et les rendez-vous.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
        >
          Ajouter un employé
        </button>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">👥 Total employés</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">✅ Actifs</p>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {stats.active}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">⏸️ Inactifs</p>
          <p className="mt-2 text-3xl font-bold text-gray-700">
            {stats.inactive}
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
              placeholder="Nom ou email"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-900"
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Rôle
            </label>
            <select
              id="role"
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-900"
            >
              <option value="tous">Tous</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
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
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
            </select>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Liste des employés
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {filteredEmployees.length} employé
            {filteredEmployees.length > 1 ? "s" : ""} affiché
            {filteredEmployees.length > 1 ? "s" : ""}
          </p>
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <table className="min-w-full">
            <thead className="bg-gray-50 text-left text-sm text-gray-500">
              <tr>
                <th className="px-5 py-4 font-medium">Nom</th>
                <th className="px-5 py-4 font-medium">Rôle</th>
                <th className="px-5 py-4 font-medium">Email</th>
                <th className="px-5 py-4 font-medium">Téléphone</th>
                <th className="px-5 py-4 font-medium">Statut</th>
                <th className="px-5 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="text-sm text-gray-700 transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4 font-medium text-gray-900">
                      {employee.name}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getRoleClasses(
                          employee.role
                        )}`}
                      >
                        {employee.role}
                      </span>
                    </td>
                    <td className="px-5 py-4">{employee.email}</td>
                    <td className="px-5 py-4">{employee.phone}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                          employee.status
                        )}`}
                      >
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
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
                  <td colSpan="6" className="px-5 py-10">
                    <div className="flex flex-col items-center justify-center text-center">
                      <p className="text-sm font-medium text-gray-700">
                        Aucun employé trouvé
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Essaie de modifier les filtres pour afficher d'autres
                        résultats.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="grid gap-4 p-5 lg:hidden">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <article
                key={employee.id}
                className="rounded-2xl border border-gray-200 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {employee.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {employee.email}
                    </p>
                  </div>

                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                      employee.status
                    )}`}
                  >
                    {employee.status}
                  </span>
                </div>

                <div className="mt-4 grid gap-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-900">Rôle :</span>{" "}
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getRoleClasses(
                        employee.role
                      )}`}
                    >
                      {employee.role}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium text-gray-900">
                      Téléphone :
                    </span>{" "}
                    {employee.phone}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-2">
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
                Aucun employé trouvé
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