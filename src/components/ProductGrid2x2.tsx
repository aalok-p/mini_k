import React from "react";
import { Text, View } from "react-native";
import { useDynamicTheme } from "../context/ThemeContext";
import type { ProductGridData } from "../types/sdui";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  data: ProductGridData;
}

export const ProductGrid2x2: React.FC<ProductGridProps> = React.memo(
  ({ data }) => {
    const theme = useDynamicTheme();
    const products = data.products || [];

    return (
      <View
        className="mx-4 my-3 rounded-[20px] p-4"
        style={{
          backgroundColor: theme.cardBackground,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <View className="flex-row justify-between items-center mb-3">
          <Text
            className="text-[17px] font-black tracking-[-0.2px]"
            style={{ color: theme.text }}
          >
            {data.title}
          </Text>
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: theme.background }}
          >
            <Text
              className="text-[11px] font-black"
              style={{ color: theme.primary }}
            >
              View All
            </Text>
          </View>
        </View>

        <View className="flex-row flex-wrap -mx-[5px]">
          {products.slice(0, 4).map((product) => (
            <View className="w-1/2 p-[5px]" key={product.id}>
              <ProductCard product={product} />
            </View>
          ))}
        </View>
      </View>
    );
  },
);

export default ProductGrid2x2;
