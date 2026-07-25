import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Loader2, Plus, Pencil, Trash2, X } from "lucide-react";

const emptyForm = { name: "", slug: "", description: "", image: "", display_order: 0 };

export default function AdminCategories() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    base44.entities.Category.list("display_order", 100).then(setItems).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const update = (key, value) => setForm({ ...form, [key]: value });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const slug = form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const data = { ...form, slug, display_order: Number(form.display_order) || 0 };
      if (editing.id) await base44.entities.Category.update(editing.id, data);
      else await base44.entities.Category.create(data);
      setEditing(null);
      load();
    } catch { alert("Failed to save."); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;
    await base44.entities.Category.delete(id);
    load();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy-800">Categories</h1>
        <button onClick={() => { setEditing({}); setForm(emptyForm); }} className="flex items-center gap-2 px-4 py-2.5 bg-navy-800 text-white rounded-lg font-medium hover:bg-navy-700">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-navy-800" /></div>
      ) : items.length === 0 ? (
        <p className="text-gray-400 text-center py-20">No categories yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((c) => (
            <div key={c.id} className="bg-white rounded-lg border border-gray-200 p-5">
              {c.image && <img src={c.image} alt={c.name} className="w-full h-32 object-cover rounded mb-3" />}
              <h3 className="font-semibold text-navy-800">{c.name}</h3>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{c.description}</p>
              <div className="flex gap-2">
                <button onClick={() => { setEditing(c); setForm({ ...emptyForm, ...c }); }} className="p-2 text-gray-400 hover:text-navy-800"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(c.id)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="font-bold text-navy-800">{editing.id ? "Edit Category" : "New Category"}</h2>
              <button onClick={() => setEditing(null)} className="text-gray-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Name *</label><input type="text" required value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-400" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Slug</label><input type="text" value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder="auto-generated" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-400" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea rows={3} value={form.description} onChange={(e) => update("description", e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-400 resize-none" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label><input type="text" value={form.image} onChange={(e) => update("image", e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-400" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label><input type="number" value={form.display_order} onChange={(e) => update("display_order", e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-400" /></div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="flex-1 px-6 py-3 bg-navy-800 text-white font-semibold rounded-lg hover:bg-navy-700 disabled:opacity-60">{saving ? "Saving..." : "Save"}</button>
                <button type="button" onClick={() => setEditing(null)} className="px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}