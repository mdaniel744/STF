"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import PageNotFound from "@/lib/PageNotFound";
import { getLocalizedRouteKey } from "@/lib/i18n/permalinks";

const localizedPages = {
  about: dynamic(() => import("@/views/About")),
  cart: dynamic(() => import("@/views/Cart")),
  checkout: dynamic(() => import("@/views/Checkout")),
  contact: dynamic(() => import("@/views/Contact")),
  containers: dynamic(() => import("@/views/Containers")),
  cookies: dynamic(() => import("@/views/Cookies")),
  disclaimer: dynamic(() => import("@/views/Disclaimer")),
  faq: dynamic(() => import("@/views/FAQ")),
  privacy: dynamic(() => import("@/views/Privacy")),
  "refund-policy": dynamic(() => import("@/views/RefundPolicy")),
  "shipping-policy": dynamic(() => import("@/views/ShippingPolicy")),
  terms: dynamic(() => import("@/views/Terms")),
};

export default function LocalizedPage() {
  const params = useParams();
  const routeKey = getLocalizedRouteKey(params.page, params.lang);
  const View = localizedPages[routeKey];

  if (!View) return <PageNotFound />;
  return <View />;
}
