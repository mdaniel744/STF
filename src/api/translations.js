import { supabase, hasSupabaseConfig, STORE_ID } from "@/lib/supabaseClient";

export async function fetchTranslations(entityType, entityIds, locale) {
  if (!hasSupabaseConfig || !entityIds?.length) return {};

  try {
    const { data, error } = await supabase
      .from("translations")
      .select("entity_id, field_name, value")
      .eq("store_id", STORE_ID)
      .eq("entity_type", entityType)
      .eq("locale", locale)
      .in("entity_id", entityIds);
    if (error) throw error;

    const map = {};
    (data || []).forEach((row) => {
      if (!map[row.entity_id]) map[row.entity_id] = {};
      map[row.entity_id][row.field_name] = row.value;
    });
    return map;
  } catch {
    return {};
  }
}

// translated value if present, else the Dutch source value — never blank
export function overlayTranslation(item, translationsMap, fields) {
  const overlay = translationsMap?.[item.id];
  if (!overlay) return item;

  const result = { ...item };
  fields.forEach((field) => {
    if (overlay[field]) result[field] = overlay[field];
  });
  return result;
}
