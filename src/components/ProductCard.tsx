import { Minus, Plus, Star } from "lucide-react-native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useDynamicTheme } from "../context/ThemeContext";
import { useCartQuantity } from "../store/appStore";
import type { Product } from "../types/sdui";
import { handleAction } from "../utils/actionDispatcher";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(
  ({ product }) => {
    const theme = useDynamicTheme();
    const quantity = useCartQuantity(product.id);

    const discount = product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;

    const handleAdd = () => {
      handleAction({
        type: "ADD_TO_CART",
        payload: { product },
      });
    };

    const handleRemove = () => {
      handleAction({
        type: "REMOVE_FROM_CART",
        payload: { productId: product.id, productName: product.name },
      });
    };

    return (
      <View
        className="rounded-[16px] overflow-hidden flex-1 m-[5px]"
        style={{
          backgroundColor: theme.cardBackground,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <View className="w-full h-[130px] relative bg-[#F5F5F5]">
          <Image
            source={{ uri: product.imageUrl }}
            className="w-full h-full"
            resizeMode="cover"
          />

          {discount > 0 && (
            <View
              className="absolute top-2 left-2 px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "#DC2626" }}
            >
              <Text className="text-white text-[9px] font-black">
                {discount}% OFF
              </Text>
            </View>
          )}

          {product.rating && (
            <View className="absolute bottom-2 left-2 flex-row items-center bg-[rgba(0,0,0,0.7)] rounded-full px-2 py-[3px] gap-[3px]">
              <Star size={9} color="#FFB800" fill="#FFB800" />
              <Text className="text-white text-[9px] font-bold">
                {product.rating.toFixed(1)}
              </Text>
            </View>
          )}
        </View>

        <View className="p-3 flex-1 justify-between">
          <Text
            className="text-[10px] font-black tracking-[0.6px] mb-1 uppercase"
            style={{ color: theme.primary }}
          >
            {product.category || "Essential"}
          </Text>

          <Text
            className="text-[13px] font-bold leading-[17px] mb-2"
            style={{ color: theme.text }}
            numberOfLines={2}
          >
            {product.name}
          </Text>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-baseline gap-1.5">
              <Text
                className="text-[15px] font-black"
                style={{ color: theme.text }}
              >
                ₹{product.price}
              </Text>
              {product.originalPrice && (
                <Text
                  className="text-[11px] line-through font-medium"
                  style={{ color: theme.textSecondary }}
                >
                  ₹{product.originalPrice}
                </Text>
              )}
            </View>

            <View className="min-w-[70px] items-end">
              {quantity === 0 ? (
                <TouchableOpacity
                  onPress={handleAdd}
                  className="flex-row items-center justify-center px-3 py-2 rounded-[10px]"
                  style={{ backgroundColor: theme.primary }}
                  activeOpacity={0.8}
                >
                  <Plus size={13} color="#FFF" />
                  <Text className="text-white text-[10px] font-black ml-1">
                    ADD
                  </Text>
                </TouchableOpacity>
              ) : (
                <View
                  className="flex-row items-center rounded-[10px] overflow-hidden"
                  style={{
                    borderWidth: 1.5,
                    borderColor: theme.primary,
                    backgroundColor: theme.background,
                  }}
                >
                  <TouchableOpacity
                    onPress={handleRemove}
                    className="p-2 items-center justify-center"
                    activeOpacity={0.6}
                  >
                    <Minus size={12} color={theme.primary} />
                  </TouchableOpacity>

                  <Text
                    className="text-[12px] font-black px-1.5 min-w-[22px] text-center"
                    style={{ color: theme.text }}
                  >
                    {quantity}
                  </Text>

                  <TouchableOpacity
                    onPress={handleAdd}
                    className="p-2 items-center justify-center"
                    activeOpacity={0.6}
                  >
                    <Plus size={12} color={theme.primary} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  },
);

export default ProductCard;
