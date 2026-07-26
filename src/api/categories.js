import { supabase, hasSupabaseConfig, STORE_ID } from "@/lib/supabaseClient";

export async function listFeaturedCategories() {
  if (!hasSupabaseConfig) return [];

  try {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name, slug, description, image_url, display_order")
      .eq("store_id", STORE_ID)
      .eq("is_featured", true)
      .order("display_order", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}

export async function findCategoryBySlug(slug) {
  if (!hasSupabaseConfig || !slug) return null;

  try {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name, slug, description, image_url")
      .eq("store_id", STORE_ID)
      .eq("slug", slug)
      .limit(1);

    if (error) throw error;
    return data?.[0] || null;
  } catch {
    return null;
  }
}
