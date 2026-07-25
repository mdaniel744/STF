import { findDefaultProductBySlugOrId, localizeDefaultProduct } from "@/data/default-products";
import { displayProductLabel } from "./productLabels";

export function localizeCartItem(item, language) {
  const product = findDefaultProductBySlugOrId(item.product_id || item.slug);
  const localizedProduct = product ? localizeDefaultProduct(product, language) : null;
  const rawType = localizedProduct?.container_type || item.container_type;
  const rawCondition = localizedProduct?.condition || item.condition;

  return {
    ...item,
    displayName: localizedProduct?.name || item.product_name,
    displaySlug: localizedProduct?.slug || item.slug || item.product_id,
    displayImage: item.main_image || localizedProduct?.main_image,
    displayType: displayProductLabel(language, "type", rawType),
    displayCondition: displayProductLabel(language, "condition", rawCondition),
    displayColor: item.color ? displayProductLabel(language, "color", item.color) : "",
  };
}
