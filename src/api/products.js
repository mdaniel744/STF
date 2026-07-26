import { base44 } from "@/api/base44Client";
import { appParams } from "@/lib/app-params";
import { supabase, hasSupabaseConfig, STORE_ID } from "@/lib/supabaseClient";
import {
  filterDefaultProducts,
  findDefaultProductBySlugOrId,
  listDefaultProducts,
} from "@/data/default-products";

export const hasConfiguredBase44App = Boolean(
  appParams.appId && appParams.appId !== "null" && appParams.appId !== "undefined"
);

const ATTRIBUTE_FILTER_KEYS = {
  container_type: "Container Type",
  container_size: "Container Size",
  condition: "Condition",
  color: "Color",
};

const SORT_COLUMNS = {
  created_date: "created_at",
  price: "price",
};

function mapProductRow(row) {
  const attrs = row.attributes || {};
  const images = Array.isArray(row.images) ? row.images : [];
  const color = attrs["Color"] || null;

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    container_type: attrs["Container Type"] || null,
    container_size: attrs["Container Size"] || null,
    condition: attrs["Condition"] || null,
    color,
    available_colors: color ? [color] : [],
    price: Number(row.price) || 0,
    currency: row.currency || "EUR",
    short_description: row.short_description || "",
    description: row.description || "",
    availability: row.stock_quantity > 0 ? "In Stock" : "Out of Stock",
    featured: row.is_featured,
    main_image: images[0] || null,
    gallery_images: images.slice(1),
    created_date: row.created_at,
  };
}

function applySort(query, sort) {
  const direction = sort?.startsWith("-") ? "-" : "";
  const field = (sort || "-created_date").replace(/^-/, "");
  const column = SORT_COLUMNS[field] || "created_at";
  return query.order(column, { ascending: direction !== "-" });
}

function applyFilters(query, filters) {
  let q = query;

  const attributeMatch = {};
  Object.entries(ATTRIBUTE_FILTER_KEYS).forEach(([queryKey, attributeName]) => {
    if (filters[queryKey]) attributeMatch[attributeName] = filters[queryKey];
  });
  if (Object.keys(attributeMatch).length > 0) q = q.contains("attributes", attributeMatch);

  if (filters.category_id) q = q.eq("category_id", filters.category_id);
  if (filters.availability === "In Stock") q = q.gt("stock_quantity", 0);
  if (filters.availability === "Out of Stock") q = q.eq("stock_quantity", 0);
  return q;
}

export async function listProducts(sort = "-created_date", limit = 100) {
  if (!hasSupabaseConfig) return listDefaultProducts(sort, limit);

  try {
    let query = supabase
      .from("products")
      .select("*")
      .eq("store_id", STORE_ID)
      .eq("status", "active")
      .limit(limit);
    query = applySort(query, sort);

    const { data, error } = await query;
    if (error) throw error;
    return (data || []).map(mapProductRow);
  } catch {
    return listDefaultProducts(sort, limit);
  }
}

export async function filterProducts(query = {}, sort = "-created_date", limit = 100) {
  if (!hasSupabaseConfig) return filterDefaultProducts(query, sort, limit);

  try {
    let q = supabase
      .from("products")
      .select("*")
      .eq("store_id", STORE_ID)
      .eq("status", "active")
      .limit(limit);
    q = applyFilters(q, query);
    q = applySort(q, sort);

    const { data, error } = await q;
    if (error) throw error;
    return (data || []).map(mapProductRow);
  } catch {
    return filterDefaultProducts(query, sort, limit);
  }
}

export async function findProductBySlugOrId(slugOrId) {
  if (!hasSupabaseConfig) return findDefaultProductBySlugOrId(slugOrId);

  try {
    const { data: bySlug, error: slugError } = await supabase
      .from("products")
      .select("*")
      .eq("store_id", STORE_ID)
      .eq("status", "active")
      .eq("slug", slugOrId)
      .limit(1);
    if (slugError) throw slugError;
    if (bySlug?.length) return mapProductRow(bySlug[0]);

    const { data: byId, error: idError } = await supabase
      .from("products")
      .select("*")
      .eq("store_id", STORE_ID)
      .eq("status", "active")
      .eq("id", slugOrId)
      .limit(1);
    if (idError) throw idError;
    if (byId?.length) return mapProductRow(byId[0]);

    return null;
  } catch {
    return findDefaultProductBySlugOrId(slugOrId);
  }
}
