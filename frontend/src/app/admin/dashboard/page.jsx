"use client";

import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/lib/api";

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedToken = window.localStorage.getItem("admin_token");
    if (savedToken) {
        setToken(savedToken);
    }
  }, []);

  async function handleLoadDashboard() {
    try {
      setLoading(true);
      setError("");

      window.localStorage.setItem("admin_token", token);

      const result = await fetchWithAuth("/dashboard/stats", token);
      setData(result);
    } catch (err) {
        console.error(err);
        setError(err.message || "Impossible de charger les statistiques.");
        setData(null);
    } finally {
        setLoading(false);
    }
}

function handleClearToken() {
    window.localStorage.removeItem("admin_token");
    setToken("");
    setData(null);
    setError("");
}

  return (
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard admin</h1>
          <p className="mt-2 text-sm text-gray-600">
            Vue d’ensemble de l’activité BarberBook.
          </p>
        </header>

        <section className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Token admin Sanctum
          </label>
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Colle ici ton token admin"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-500"
            />
            <button
              onClick={handleLoadDashboard}
              className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              Charger le dashboard
            </button>

            <button
                onClick={handleClearToken}
                className="rounded-xl border border-gray-300 px-5 py-3 text3sm font-medium text-gray-700 hover-bg-gray-50"
            >
                Effacer
            </button>
          </div>

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </section>

        {loading && (
          <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600">Chargement des statistiques...</p>
          </div>
        )}

        {data && (
          <>
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <StatCard title="Rendez-vous du jour" value={data.appointments_today} />
              <StatCard title="Confirmés" value={data.appointments_confirmed} />
              <StatCard title="En attente" value={data.appointments_pending} />
              <StatCard title="Employés actifs" value={data.employees_active} />
            </section>

            <section className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Prochains rendez-vous
              </h2>

              {data.next_appointments?.length === 0 ? (
                <p className="mt-4 text-sm text-gray-600">
                  Aucun rendez-vous à venir.
                </p>
              ) : (
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full border-separate border-spacing-y-2 text-sm">
                    <thead>
                      <tr className="text-left text-gray-500">
                        <th className="px-3 py-2">Date</th>
                        <th className="px-3 py-2">Heure</th>
                        <th className="px-3 py-2">Client</th>
                        <th className="px-3 py-2">Employé</th>
                        <th className="px-3 py-2">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.next_appointments.map((appointment) => (
                        <tr
                          key={appointment.id}
                          className="bg-gray-50 text-gray-800"
                        >
                          <td className="rounded-l-xl px-3 py-3">
                            {formatDate(appointment.appointment_date)}
                          </td>
                          <td className="px-3 py-3">
                            {appointment.appointment_time?.slice(0, 5)}
                          </td>
                          <td className="px-3 py-3">
                            {appointment.client?.first_name} {appointment.client?.last_name}
                          </td>
                          <td className="px-3 py-3">
                            {appointment.employee?.user?.name ?? "—"}
                          </td>
                          <td className="rounded-r-xl px-3 py-3">
                            <StatusBadge status={appointment.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </div>
  );
}

function StatCard({ title, value }) {
  return (
    <article className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
    </article>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending: "bg-amber-100 text-amber-700",
    confirmed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    completed: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] ?? "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}