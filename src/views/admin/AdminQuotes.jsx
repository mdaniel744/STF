import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Loader2, Eye, Trash2, X, Mail } from "lucide-react";

const STATUSES = ["New", "In Progress", "Quoted", "Accepted", "Declined"];

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const load = () => {
    setLoading(true);
    base44.entities.QuoteRequest.list("-created_date", 100).then(setQuotes).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await base44.entities.QuoteRequest.update(id, { status });
    load();
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this quote request?")) return;
    await base44.entities.QuoteRequest.delete(id);
    setSelected(null);
    load();
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-navy-800 mb-6">Quote Requests</h1>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-navy-800" /></div>
      ) : quotes.length === 0 ? (
        <p className="text-gray-400 text-center py-20">No quote requests yet.</p>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Customer</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden sm:table-cell">Product</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden md:table-cell">Date</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Status</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => (
                <tr key={q.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-navy-800 text-sm">{q.customer_name}</p>
                    <p className="text-xs text-gray-400">{q.email}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 hidden sm:table-cell">{q.product_name || "—"}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 hidden md:table-cell">{q.created_date ? new Date(q.created_date).toLocaleDateString("nl-NL") : "—"}</td>
                  <td className="px-4 py-3">
                    <select
                      value={q.status}
                      onChange={(e) => updateStatus(q.id, e.target.value)}
                      className={`text-xs font-medium px-2 py-1 rounded border-0 cursor-pointer ${
                        q.status === "New" ? "bg-orange-100 text-orange-700" :
                        q.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                        q.status === "Quoted" ? "bg-purple-100 text-purple-700" :
                        q.status === "Accepted" ? "bg-green-100 text-green-700" :
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setSelected(q)} className="p-2 text-gray-400 hover:text-navy-800"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(q.id)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="font-bold text-navy-800">Quote Request Details</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <Detail label="Customer" value={selected.customer_name} />
              <Detail label="Company" value={selected.company} />
              <Detail label="Email" value={selected.email} />
              <Detail label="Telephone" value={selected.telephone} />
              <Detail label="Country" value={selected.country} />
              <Detail label="Delivery Address" value={selected.delivery_address} />
              <Detail label="Postal Code" value={selected.postal_code} />
              <Detail label="Product" value={selected.product_name} />
              <Detail label="Quantity" value={selected.quantity} />
              <Detail label="Preferred Delivery Date" value={selected.preferred_delivery_date} />
              <Detail label="Transport Required" value={selected.transport_required} />
              <Detail label="Status" value={selected.status} />
              {selected.message && <Detail label="Message" value={selected.message} />}
              <div className="pt-4 border-t border-gray-100">
                <a href={`mailto:${selected.email}?subject=Re: Quote Request - ${selected.product_name || ""}`} className="flex items-center justify-center gap-2 px-6 py-3 bg-navy-800 text-white font-medium rounded-lg hover:bg-navy-700">
                  <Mail className="w-4 h-4" /> Reply by Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-gray-500 flex-shrink-0">{label}</span>
      <span className="font-medium text-navy-800 text-right">{value || "—"}</span>
    </div>
  );
}