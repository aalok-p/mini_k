import { useAppStore } from "../store/appStore";
import type { SDUIAction } from "../types/sdui";

// receives action definition from SDUI nodes and processes them.

export const handleAction = (action: SDUIAction) => {
  const store = useAppStore.getState();

  if (!action?.type) {
    console.warn("Action Dispatcher: Received an empty or invalid action.");
    return;
  }

  switch (action.type) {
    case "ADD_TO_CART": {
      const { product } = action.payload;
      if (!product?.id) {
        store.showToast("Failed to add: invalid product data", "error");
        return;
      }
      store.addToCart(product);
      store.showToast(`Added ${product.name} to cart!`, "success");
      break;
    }

    case "REMOVE_FROM_CART": {
      const { productId, productName } = action.payload || {};
      if (!productId) {
        store.showToast("Failed to remove: invalid product ID", "error");
        return;
      }
      store.removeFromCart(productId);
      store.showToast(`Removed ${productName || "item"} from cart`, "info");
      break;
    }

    case "DEEP_LINK": {
      const { url } = action.payload || {};
      if (!url) {
        store.showToast("Invalid deep link destination", "error");
        return;
      }
      store.showToast(`Navigating to: ${url}`, "info");
      break;
    }

    case "APPLY_MYSTERY_GIFT_COUPON": {
      const { couponCode } = action.payload || {};
      store.applyCoupon(couponCode || "MYSTERY50");
      store.showToast(
        `Mystery Gift Applied: "${couponCode || "MYSTERY50"}"!`,
        "coupon",
      );
      break;
    }

    case "BOOK_TICKETS": {
      const { eventName } = action.payload || {};
      store.showToast(
        `Tickets booked for ${eventName || "Petting Zoo"}!`,
        "success",
      );
      break;
    }

    default:
      console.warn(
        `Action Dispatcher: Unsupported action type "${action.type}"`,
      );
      store.showToast(
        `Action "${action.type}" not supported on this client version.`,
        "info",
      );
      break;
  }
};
