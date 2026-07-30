"use client";

import { useParams } from "next/navigation";
import PageNotFound from "@/lib/PageNotFound";
import { getLocalizedRouteKey } from "@/lib/i18n/permalinks";
import ProductDetail from "@/views/ProductDetail";

export default function LocalizedProductPage() {
  const params = useParams();
  const routeKey = getLocalizedRouteKey(params.page, params.lang);

  if (routeKey !== "containers") return <PageNotFound />;
  return <ProductDetail slug={params.slug} />;
}
