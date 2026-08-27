import { Check, Gift, Sparkles } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDynamicTheme } from "../context/ThemeContext";
import { useAppStore } from "../store/appStore";
import type { MysteryGiftBannerData, SDUIAction } from "../types/sdui";
import { handleAction } from "../utils/actionDispatcher";

interface MysteryGiftBannerProps {
  data: MysteryGiftBannerData;
  action?: SDUIAction;
}

export const MysteryGiftBanner: React.FC<MysteryGiftBannerProps> = React.memo(
  ({ data, action }) => {
    const theme = useDynamicTheme();
    const couponApplied = useAppStore((state) => state.couponApplied);

    const handleApply = () => {
      if (action) {
        handleAction(action);
      }
    };

    return (
      <View
        className="mx-4 my-3 rounded-[20px] overflow-hidden"
        style={{
          backgroundColor: theme.background,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        <View className="p-4">
          <View className="flex-row items-center gap-2 mb-2">
            <View
              className="w-9 h-9 rounded-full items-center justify-center"
              style={{ backgroundColor: theme.primary }}
            >
              <Gift size={18} color="#FFF" />
            </View>
            <View className="flex-1">
              <Text
                className="text-[16px] font-black"
                style={{ color: theme.text }}
              >
                {data.title}
              </Text>
            </View>
            <Sparkles size={20} color={theme.primary} />
          </View>

          <Text
            className="text-[12px] leading-[18px] mb-4 font-medium"
            style={{ color: theme.textSecondary }}
          >
            {data.description}
          </Text>

          <View
            className="rounded-[14px] p-3 flex-row items-center justify-between"
            style={{
              borderWidth: 2,
              borderStyle: "dashed",
              borderColor: theme.primary,
              backgroundColor: theme.cardBackground,
            }}
          >
            <View>
              <Text
                className="text-[9px] font-bold uppercase tracking-[0.5px]"
                style={{ color: theme.textSecondary }}
              >
                Promo Code
              </Text>
              <Text
                className="text-[16px] font-black tracking-[1px] mt-0.5"
                style={{ color: theme.primary }}
              >
                {data.couponCode}
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleApply}
              disabled={couponApplied}
              className="px-4 py-2.5 rounded-full flex-row items-center justify-center"
              style={{
                backgroundColor: couponApplied
                  ? theme.secondary
                  : theme.primary,
              }}
              activeOpacity={0.8}
            >
              {couponApplied ? (
                <>
                  <Check size={14} color="#FFF" />
                  <Text className="text-white text-[11px] font-black ml-1">
                    Applied
                  </Text>
                </>
              ) : (
                <Text className="text-white text-[12px] font-black">
                  Apply Now
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  },
);

export default MysteryGiftBanner;
