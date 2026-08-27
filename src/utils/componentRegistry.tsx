import type React from "react";
import BannerHero from "../components/BannerHero";
import DynamicCollection from "../components/DynamicCollection";
import MysteryGiftBanner from "../components/MysteryGiftBanner";
import ProductGrid2x2 from "../components/ProductGrid2x2";
import SchoolSpecialRow from "../components/SchoolSpecialRow";
import ZooTicketsBooking from "../components/ZooTicketsBooking";
import type { SDUINode } from "../types/sdui";

const REGISTRY: Record<string, React.ComponentType<any>> = {
  BANNER_HERO: BannerHero,
  PRODUCT_GRID_2X2: ProductGrid2x2,
  DYNAMIC_COLLECTION: DynamicCollection,
  SCHOOL_SPECIAL_ROW: SchoolSpecialRow,
  ZOO_TICKETS_BOOKING: ZooTicketsBooking,
  MYSTERY_GIFT_BANNER: MysteryGiftBanner,
};

export const renderSDUINode = (node: SDUINode): React.ReactElement | null => {
  if (!node?.type) {
    return null;
  }

  const RegisteredComponent = REGISTRY[node.type];

  if (!RegisteredComponent) {
    return null;
  }

  return (
    <RegisteredComponent key={node.id} data={node.data} action={node.action} />
  );
};
