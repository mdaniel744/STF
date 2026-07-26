import { Box, ArrowUpFromLine, DoorOpen, Building2, Archive, Snowflake } from "lucide-react";

const ICON_RULES = [
  [/high\s*cube/i, ArrowUpFromLine],
  [/open\s*side/i, DoorOpen],
  [/office|kantoor|büro|bureau|oficina/i, Building2],
  [/storage|opslag|lager|stockage|almacenamiento/i, Archive],
  [/refrigerat|gekoeld|kühl|réfrigéré|refrigerado/i, Snowflake],
];

export function getCategoryIcon(nameOrSlug) {
  const value = nameOrSlug || "";
  const match = ICON_RULES.find(([pattern]) => pattern.test(value));
  return match ? match[1] : Box;
}
