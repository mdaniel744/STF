import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Package, MessageSquare, FileText, TrendingUp, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, quotes: 0, faqs: 0, newQuotes: 0 });
  const [recentQuotes, setRecentQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      base44.entities.Product.list("-created_date", 1),
      base44.entities.QuoteRequest.list("-created_date", 5),
      base44.entities.FAQ.list("-created_date", 1),
    ]).then(([products, quotes, faqs]) => {
      setStats({
        products: products.length,
        quotes: quotes.length,
        faqs: faqs.length,
        newQuotes: quotes.filter((q) => q.status === "New").length,
      });
      setRecentQuotes(quotes);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <AdminLayout><div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-navy-800" /></div></AdminLayout>;
  }

  const cards = [
    { label: "Total Products", value: stats.products, icon: Package, path: "/admin/products", color: "bg-navy-800" },
    { label: "Quote Requests", value: stats.quotes, icon: MessageSquare, path: "/admin/quotes", color: "bg-orange-500" },
    { label: "New Quotes", value: stats.newQuotes, icon: TrendingUp, path: "/admin/quotes", color: "bg-green-600" },
    { label: "FAQs", value: stats.faqs, icon: FileText, path: "/admin/faqs", color: "bg-purple-600" },
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-navy-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <Link key={card.label} href={card.path} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center mb-4`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-3xl font-bold text-navy-800">{card.value}</p>
            <p className="text-sm text-gray-500 mt-1">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="font-bold text-navy-800 mb-4">Recent Quote Requests</h2>
        {recentQuotes.length === 0 ? (
          <p className="text-gray-400 text-sm">No quote requests yet.</p>
        ) : (
          <div className="space-y-3">
            {recentQuotes.map((q) => (
              <div key={q.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-navy-800">{q.customer_name}</p>
                  <p className="text-sm text-gray-500">{q.product_name || "General inquiry"} · {q.email}</p>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                  q.status === "New" ? "bg-orange-100 text-orange-700" :
                  q.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                  q.status === "Quoted" ? "bg-purple-100 text-purple-700" :
                  q.status === "Accepted" ? "bg-green-100 text-green-700" :
                  "bg-gray-100 text-gray-600"
                }`}>{q.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
