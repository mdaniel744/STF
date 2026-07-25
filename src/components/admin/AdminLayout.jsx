"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, FolderTree, FileText, MessageSquare, LogOut, Menu } from "lucide-react";
import { base44 } from "@/api/base44Client";

const menuItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Products", path: "/admin/products", icon: Package },
  { label: "Categories", path: "/admin/categories", icon: FolderTree },
  { label: "Quote Requests", path: "/admin/quotes", icon: MessageSquare },
  { label: "FAQs", path: "/admin/faqs", icon: FileText },
];

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    base44.auth.logout("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-navy-800 text-white z-50 transition-transform ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">STF</span>
            </div>
            <div>
              <span className="font-bold text-sm">STF Container</span>
              <span className="text-xs block -mt-0.5 text-white/50">Admin Panel</span>
            </div>
          </div>
        </div>
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const active = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  active ? "bg-orange-500 text-navy-950" : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors w-full">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {open && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-30">
          <button onClick={() => setOpen(true)}>
            <Menu className="w-6 h-6 text-navy-800" />
          </button>
          <span className="font-bold text-navy-800">Admin Panel</span>
        </header>
        <div className="p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
