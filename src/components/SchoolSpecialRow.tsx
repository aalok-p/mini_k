import React from "react";
import { FlatList, Text, View } from "react-native";
import { useDynamicTheme } from "../context/ThemeContext";
import type { SchoolSpecialRowData } from "../types/sdui";
import { ProductCard } from "./ProductCard";

interface SchoolSpecialRowProps {
  data: SchoolSpecialRowData;
}

export const SchoolSpecialRow: React.FC<SchoolSpecialRowProps> = React.memo(
  ({ data }) => {
    const theme = useDynamicTheme();
    const products = data.products || [];

    return (
      <View
        className="mx-4 my-3 rounded-[20px] overflow-hidden py-4"
        style={{
          backgroundColor: theme.background,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.08,
          shadowRadius: 10,
          elevation: 4,
        }}
      >
        <View className="flex-row justify-between items-start px-4 mb-3">
          <View>
            <Text
              className="text-[17px] font-black tracking-[-0.2px]"
              style={{ color: theme.text }}
            >
              {data.title}
            </Text>
            <Text
              className="text-[11px] font-bold mt-1"
              style={{ color: theme.textSecondary }}
            >
              Festival Specials for Your Little Ones
            </Text>
          </View>
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: theme.cardBackground }}
          >
            <Text
              className="text-[11px] font-black"
              style={{ color: theme.primary }}
            >
              View All
            </Text>
          </View>
        </View>

        <FlatList
          data={products}
          renderItem={({ item }) => (
            <View className="w-[160px]">
              <ProductCard product={item} />
            </View>
          )}
          keyExtractor={(item) => `special-item-${item.id}`}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
          removeClippedSubviews={true}
          initialNumToRender={3}
          maxToRenderPerBatch={4}
          windowSize={3}
          contentContainerStyle={{ paddingHorizontal: 11 }}
        />
      </View>
    );
  },
);

export default SchoolSpecialRow;
