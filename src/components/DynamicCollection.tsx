import React from "react";
import { FlatList, Text, View } from "react-native";
import { useDynamicTheme } from "../context/ThemeContext";
import type { DynamicCollectionData } from "../types/sdui";
import { ProductCard } from "./ProductCard";

interface DynamicCollectionProps {
  data: DynamicCollectionData;
}

export const DynamicCollection: React.FC<DynamicCollectionProps> = React.memo(
  ({ data }) => {
    const theme = useDynamicTheme();
    const products = data.products || [];

    return (
      <View className="my-3">
        <View className="flex-row justify-between items-end px-4 mb-3">
          <View className="flex-1 pr-3">
            <Text
              className="text-[18px] font-black tracking-[-0.3px]"
              style={{ color: theme.text }}
            >
              {data.title}
            </Text>
            {data.subtitle && (
              <Text
                className="text-[12px] mt-1 font-medium"
                style={{ color: theme.textSecondary }}
              >
                {data.subtitle}
              </Text>
            )}
          </View>
          <View
            className="px-3 py-1.5 rounded-full"
            style={{ backgroundColor: theme.background }}
          >
            <Text
              className="text-[11px] font-black"
              style={{ color: theme.primary }}
            >
              See All
            </Text>
          </View>
        </View>

        <FlatList
          data={products}
          renderItem={({ item }) => (
            <View className="w-[170px]">
              <ProductCard product={item} />
            </View>
          )}
          keyExtractor={(item) => `carousel-item-${item.id}`}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
          removeClippedSubviews={true}
          initialNumToRender={3}
          maxToRenderPerBatch={4}
          windowSize={3}
          decelerationRate="fast"
          snapToInterval={180}
          snapToAlignment="start"
          contentContainerStyle={{ paddingHorizontal: 11 }}
        />
      </View>
    );
  },
);

export default DynamicCollection;
