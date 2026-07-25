import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Loader2, Plus, Pencil, Trash2, X } from "lucide-react";

const SIZES = ["10ft", "20ft", "40ft"];
const TYPES = ["Standard", "High Cube", "Open Side", "Office", "Storage", "Refrigerated"];
const CONDITIONS = ["New", "Used", "One Trip", "WWT"];
const COLORS = ["Blue", "Grey", "Green", "White", "Red", "Brown"];
const AVAILABILITY = ["In Stock", "Out of Stock", "Pre-Order"];

const emptyForm = {
  name: "", slug: "", container_type: "Standard", container_size: "20ft", condition: "New",
  color: "Blue", price: 0, short_description: "", description: "", specs_length: "", specs_width: "",
  specs_height: "", specs_weight: "", specs_volume: "", specs_payload: "", specs_floor_type: "", specs_door_type: "",
  features: "", applications: "", delivery_info: "", availability: "In Stock", featured: false,
  main_image: "", seo_title: "", seo_description: "",
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    base44.entities.Product.list("-created_date", 100).then(setProducts).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const update = (key, value) => setForm({ ...form, [key]: value });

  const handleEdit = (product) => {
    setEditing(product);
    setForm({ ...emptyForm, ...product });
  };

  const handleNew = () => {
    setEditing({});
    setForm(emptyForm);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const slug = form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const data = { ...form, slug, price: Number(form.price) || 0, featured: !!form.featured };
      if (editing.id) {
        await base44.entities.Product.update(editing.id, data);
      } else {
        await base44.entities.Product.create(data);
      }
      setEditing(null);
      load();
    } catch {
      alert("Failed to save product.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await base44.entities.Product.delete(id);
    load();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy-800">Products</h1>
        <button onClick={handleNew} className="flex items-center gap-2 px-4 py-2.5 bg-navy-800 text-white rounded-lg font-medium hover:bg-navy-700 transition-colors">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-navy-800" /></div>
      ) : products.length === 0 ? (
        <p className="text-gray-400 text-center py-20">No products yet. Click "Add Product" to create one.</p>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Name</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden sm:table-cell">Type</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden sm:table-cell">Size</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Price</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden sm:table-cell">Status</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.main_image && <img src={p.main_image} alt="" className="w-10 h-10 rounded object-cover" />}
                      <span className="font-medium text-navy-800 text-sm">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 hidden sm:table-cell">{p.container_type}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 hidden sm:table-cell">{p.container_size}</td>
                  <td className="px-4 py-3 text-sm font-medium text-navy-800">€{p.price?.toLocaleString("nl-NL")}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`text-xs px-2 py-1 rounded ${p.availability === "In Stock" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{p.availability}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleEdit(p)} className="p-2 text-gray-400 hover:text-navy-800"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start lg:items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-3xl my-8">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="font-bold text-navy-800">{editing.id ? "Edit Product" : "New Product"}</h2>
              <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Inp label="Name *" value={form.name} onChange={(v) => update("name", v)} required />
                <Inp label="Slug" value={form.slug} onChange={(v) => update("slug", v)} placeholder="auto-generated" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Sel label="Type" value={form.container_type} options={TYPES} onChange={(v) => update("container_type", v)} />
                <Sel label="Size" value={form.container_size} options={SIZES} onChange={(v) => update("container_size", v)} />
                <Sel label="Condition" value={form.condition} options={CONDITIONS} onChange={(v) => update("condition", v)} />
                <Sel label="Color" value={form.color} options={COLORS} onChange={(v) => update("color", v)} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Inp label="Price (€)" type="number" value={form.price} onChange={(v) => update("price", v)} />
                <Sel label="Availability" value={form.availability} options={AVAILABILITY} onChange={(v) => update("availability", v)} />
                <div className="flex items-end">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 pb-2.5">
                    <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} className="w-4 h-4" /> Featured
                  </label>
                </div>
              </div>
              <Inp label="Main Image URL" value={form.main_image} onChange={(v) => update("main_image", v)} />
              <Inp label="Short Description" value={form.short_description} onChange={(v) => update("short_description", v)} />
              <Txt label="Description" value={form.description} onChange={(v) => update("description", v)} />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Inp label="Length" value={form.specs_length} onChange={(v) => update("specs_length", v)} />
                <Inp label="Width" value={form.specs_width} onChange={(v) => update("specs_width", v)} />
                <Inp label="Height" value={form.specs_height} onChange={(v) => update("specs_height", v)} />
                <Inp label="Weight" value={form.specs_weight} onChange={(v) => update("specs_weight", v)} />
                <Inp label="Volume" value={form.specs_volume} onChange={(v) => update("specs_volume", v)} />
                <Inp label="Payload" value={form.specs_payload} onChange={(v) => update("specs_payload", v)} />
                <Inp label="Floor Type" value={form.specs_floor_type} onChange={(v) => update("specs_floor_type", v)} />
                <Inp label="Door Type" value={form.specs_door_type} onChange={(v) => update("specs_door_type", v)} />
              </div>
              <Txt label="Features" value={form.features} onChange={(v) => update("features", v)} />
              <Txt label="Applications" value={form.applications} onChange={(v) => update("applications", v)} />
              <Txt label="Delivery Info" value={form.delivery_info} onChange={(v) => update("delivery_info", v)} />
              <Inp label="SEO Title" value={form.seo_title} onChange={(v) => update("seo_title", v)} />
              <Inp label="SEO Description" value={form.seo_description} onChange={(v) => update("seo_description", v)} />
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="flex-1 px-6 py-3 bg-navy-800 text-white font-semibold rounded-lg hover:bg-navy-700 transition-colors disabled:opacity-60">
                  {saving ? "Saving..." : "Save Product"}
                </button>
                <button type="button" onClick={() => setEditing(null)} className="px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

function Inp({ label, value, onChange, type = "text", required, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input type={type} value={value || ""} onChange={(e) => onChange(e.target.value)} required={required} placeholder={placeholder} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-400" />
    </div>
  );
}
function Sel({ label, value, options, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select value={value || ""} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-400">
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
function Txt({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea rows={3} value={value || ""} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-400 resize-none" />
    </div>
  );
}
