import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { useDynamicTheme } from "../context/ThemeContext";
import type { BannerHeroData, SDUIAction } from "../types/sdui";
import { handleAction } from "../utils/actionDispatcher";

interface BannerHeroProps {
  data: BannerHeroData;
  action?: SDUIAction;
}

export const BannerHero: React.FC<BannerHeroProps> = React.memo(
  ({ data, action }) => {
    const theme = useDynamicTheme();

    const handlePress = () => {
      if (action) {
        handleAction(action);
      }
    };

    return (
      <TouchableOpacity
        activeOpacity={0.92}
        onPress={handlePress}
        disabled={!action}
        className="mx-4 my-3 rounded-[20px] overflow-hidden h-[200px]"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 8,
        }}
      >
        <ImageBackground
          source={{ uri: data.imageUrl }}
          className="w-full h-full"
          imageStyle={{ borderRadius: 20 }}
          resizeMode="cover"
        >
          <View className="flex-1 justify-between p-5">
            <View className="flex-row justify-between items-start">
              {data.badgeText && (
                <View
                  className="px-3 py-1.5 rounded-full"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.95)",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                >
                  <Text
                    className="text-[10px] font-black tracking-[0.6px]"
                    style={{ color: theme.primary }}
                  >
                    {data.badgeText.toUpperCase()}
                  </Text>
                </View>
              )}
            </View>

            <View className="gap-1.5">
              <Text
                className="text-white text-[22px] font-black leading-[28px]"
                style={{
                  textShadowColor: "rgba(0,0,0,0.6)",
                  textShadowOffset: { width: 0, height: 2 },
                  textShadowRadius: 6,
                }}
                numberOfLines={2}
              >
                {data.title}
              </Text>
              {data.subtitle && (
                <Text
                  className="text-white/90 text-[13px] font-semibold leading-[18px]"
                  style={{
                    textShadowColor: "rgba(0,0,0,0.5)",
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 4,
                  }}
                  numberOfLines={2}
                >
                  {data.subtitle}
                </Text>
              )}

              <View
                className="self-start mt-2 px-4 py-2 rounded-full"
                style={{ backgroundColor: theme.primary }}
              >
                <Text className="text-white text-[11px] font-black">
                  Shop Now
                </Text>
              </View>
            </View>
          </View>

          <View
            className="absolute inset-0 -z-10"
            style={{
              backgroundColor: "rgba(0,0,0,0.25)",
            }}
          />
        </ImageBackground>
      </TouchableOpacity>
    );
  },
);

export default BannerHero;
