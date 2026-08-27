import { create } from "zustand";
import type { Product } from "../types/sdui";

export interface CartItem extends Product {
  quantity: number;
}

export type CampaignMode = "none" | "rakhi" | "janmashtami" | "ganesh";

interface AppState {
  //cart state
  cart: Record<string, CartItem>;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;

  // Campaign state
  activeCampaign: CampaignMode;
  setCampaign: (campaign: CampaignMode) => void;

  //toast notification
  toastMessage: string | null;
  toastType: "success" | "info" | "error" | "coupon" | null;
  showToast: (
    message: string,
    type?: "success" | "info" | "error" | "coupon",
  ) => void;
  hideToast: () => void;

  couponApplied: boolean;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  cart: {},
  addToCart: (product) =>
    set((state) => {
      const existing = state.cart[product.id];
      const updatedCart = { ...state.cart };
      if (existing) {
        updatedCart[product.id] = {
          ...existing,
          quantity: existing.quantity + 1,
        };
      } else {
        updatedCart[product.id] = {
          ...product,
          quantity: 1,
        };
      }
      return { cart: updatedCart };
    }),
  removeFromCart: (productId) =>
    set((state) => {
      const existing = state.cart[productId];
      if (!existing) return state;
      const updatedCart = { ...state.cart };
      if (existing.quantity <= 1) {
        delete updatedCart[productId];
      } else {
        updatedCart[productId] = {
          ...existing,
          quantity: existing.quantity - 1,
        };
      }
      return { cart: updatedCart };
    }),
  clearCart: () => set({ cart: {} }),

  activeCampaign: "none",
  setCampaign: (campaign) => set({ activeCampaign: campaign }),

  toastMessage: null,
  toastType: null,
  showToast: (message, type = "info") => {
    set({ toastMessage: message, toastType: type });
  },
  hideToast: () => set({ toastMessage: null, toastType: null }),

  couponApplied: false,
  applyCoupon: (_code) => set({ couponApplied: true }),
  removeCoupon: () => set({ couponApplied: false }),
}));

export const useCartQuantity = (productId: string) =>
  useAppStore((state) => state.cart[productId]?.quantity || 0);

export const useCartTotalItems = () =>
  useAppStore((state) =>
    Object.values(state.cart).reduce((sum, item) => sum + item.quantity, 0),
  );

export const useCartTotalPrice = () =>
  useAppStore((state) =>
    Object.values(state.cart).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    ),
  );

export const useCampaignMode = () =>
  useAppStore((state) => state.activeCampaign);
