export interface SDUIAction {
  type:
    | "ADD_TO_CART"
    | "DEEP_LINK"
    | "APPLY_MYSTERY_GIFT_COUPON"
    | "BOOK_TICKETS"
    | string;
  payload?: any;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category?: string;
  rating?: number;
}

export interface BannerHeroData {
  imageUrl: string;
  title: string;
  subtitle?: string;
  badgeText?: string;
}

export interface ProductGridData {
  title: string;
  products: Product[];
}

export interface DynamicCollectionData {
  title: string;
  subtitle?: string;
  products: Product[];
}

// Campaign Special Rows
export interface SchoolSpecialRowData {
  title: string;
  products: Product[];
}

export interface ZooTicketsBookingData {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  eventDate: string;
  rating?: number;
}

export interface MysteryGiftBannerData {
  title: string;
  description: string;
  couponCode: string;
}

export interface SDUINode {
  id: string;
  type:
    | "BANNER_HERO"
    | "PRODUCT_GRID_2X2"
    | "DYNAMIC_COLLECTION"
    | "SCHOOL_SPECIAL_ROW"
    | "ZOO_TICKETS_BOOKING"
    | "MYSTERY_GIFT_BANNER"
    | string;
  data: any;
  action?: SDUIAction;
}

export interface SDUITheme {
  primary: string;
  secondary: string;
  background: string;
  cardBackground: string;
  text: string;
  textSecondary: string;
  border: string;
}

export interface SDUIResponse {
  theme?: Partial<SDUITheme>;
  layout: SDUINode[];
}
