import { base44 } from "@/api/base44Client";
import { appParams } from "@/lib/app-params";
import {
  filterDefaultProducts,
  findDefaultProductBySlugOrId,
  listDefaultProducts,
} from "@/data/default-products";

export const hasConfiguredBase44App = Boolean(
  appParams.appId && appParams.appId !== "null" && appParams.appId !== "undefined"
);

export async function listProducts(sort = "-created_date", limit = 100) {
  if (!hasConfiguredBase44App) return listDefaultProducts(sort, limit);

  try {
    return await base44.entities.Product.list(sort, limit);
  } catch {
    return listDefaultProducts(sort, limit);
  }
}

export async function filterProducts(query = {}, sort = "-created_date", limit = 100) {
  if (!hasConfiguredBase44App) return filterDefaultProducts(query, sort, limit);

  try {
    return await base44.entities.Product.filter(query, sort, limit);
  } catch {
    return filterDefaultProducts(query, sort, limit);
  }
}

export async function findProductBySlugOrId(slugOrId) {
  if (!hasConfiguredBase44App) return findDefaultProductBySlugOrId(slugOrId);

  try {
    const bySlug = await base44.entities.Product.filter({ slug: slugOrId }, "-created_date", 1);
    if (bySlug?.length) return bySlug[0];

    const all = await base44.entities.Product.list("-created_date", 100);
    return all?.find((product) => product.id === slugOrId) || null;
  } catch {
    return findDefaultProductBySlugOrId(slugOrId);
  }
}
