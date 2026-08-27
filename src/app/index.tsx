import { FlashList } from "@shopify/flash-list";
import { StatusBar } from "expo-status-bar";
import { ShoppingBag } from "lucide-react-native";
import React, { useEffect, useMemo } from "react";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  CardSkeleton,
  FeedSkeleton,
  SkeletonPulse,
} from "../components/SkeletonLoader";
import Toast from "../components/Toast";
import { ThemeProvider, useDynamicTheme } from "../context/ThemeContext";
import {
  useAppStore,
  useCartTotalItems,
  useCartTotalPrice,
} from "../store/appStore";
import { renderSDUINode } from "../utils/componentRegistry";
import { getSDUIPayload } from "../utils/mockPayload";

const OptimizedFlashList = FlashList as any;

interface SDUIFeedProps {
  feedNodes: any[];
}

const renderFeedItem = ({ item }: { item: any }) => renderSDUINode(item);
const feedKeyExtractor = (item: any) => item.id;

const FlashListPlaceholder = React.memo(() => {
  return (
    <View className="flex-1 p-2">
      <SkeletonPulse>
        <View className="flex-row gap-1">
          <View className="flex-1">
            <CardSkeleton />
          </View>
          <View className="flex-1">
            <CardSkeleton />
          </View>
        </View>
      </SkeletonPulse>
    </View>
  );
});

const SDUIFeed = React.memo(({ feedNodes }: SDUIFeedProps) => {
  return (
    <View className="flex-1">
      <OptimizedFlashList
        data={feedNodes}
        renderItem={renderFeedItem}
        keyExtractor={feedKeyExtractor}
        estimatedItemSize={200}
        contentContainerStyle={{ paddingBottom: 160 }}
        showsVerticalScrollIndicator={false}
        renderPlaceholder={FlashListPlaceholder}
      />
    </View>
  );
});

function SDUIScreen() {
  const theme = useDynamicTheme();
  const insets = useSafeAreaInsets();

  const activeCampaign = useAppStore((state) => state.activeCampaign);
  const setCampaign = useAppStore((state) => state.setCampaign);
  const toastMessage = useAppStore((state) => state.toastMessage);
  const toastType = useAppStore((state) => state.toastType);
  const hideToast = useAppStore((state) => state.hideToast);
  const clearCart = useAppStore((state) => state.clearCart);

  const totalItems = useCartTotalItems();
  const totalPrice = useCartTotalPrice();

  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    if (activeCampaign) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [activeCampaign]);

  const sduiPayload = useMemo(
    () => getSDUIPayload(activeCampaign),
    [activeCampaign],
  );

  const feedNodes = useMemo(() => {
    return sduiPayload.layout;
  }, [sduiPayload]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        hideToast();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, hideToast]);

  const campaignPills: { key: typeof activeCampaign; label: string }[] = [
    { key: "none", label: "Kiddo" },
    { key: "rakhi", label: "Raksha Bandhan" },
    { key: "janmashtami", label: "Janmashtami" },
    { key: "ganesh", label: "Ganesh Chaturthi" },
  ];

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      <StatusBar style="dark" />

      {/* Header */}
      <View
        className="flex-row justify-between items-center px-5"
        style={{
          paddingTop: Platform.OS === "ios" ? insets.top + 16 : 24,
          paddingBottom: 14,
        }}
      >
        <View>
          <Text
            className="text-[30px] font-black tracking-[-1.5px]"
            style={{ color: theme.text }}
          >
            kiddo
            <Text style={{ color: theme.primary }}>.</Text>
          </Text>
          <Text
            className="text-[10px] font-bold tracking-[0.5px] uppercase mt-0.5"
            style={{ color: theme.textSecondary }}
          >
            Delivering in 30 Mins
          </Text>
        </View>
      </View>

      {/* Campaign Pills */}
      <View className="pb-3">
        <Text
          className="text-[10px] font-black uppercase tracking-[1px] px-5 mb-2"
          style={{ color: theme.textSecondary }}
        >
          Live Campaigns
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
        >
          {campaignPills.map((pill) => (
            <TouchableOpacity
              key={pill.key}
              className="px-4 py-2.5 rounded-full"
              style={{
                backgroundColor:
                  activeCampaign === pill.key
                    ? theme.primary
                    : theme.cardBackground,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: activeCampaign === pill.key ? 0.2 : 0.05,
                shadowRadius: 4,
                elevation: activeCampaign === pill.key ? 3 : 1,
              }}
              onPress={() => setCampaign(pill.key)}
            >
              <Text
                className="text-[11px] font-black"
                style={{
                  color: activeCampaign === pill.key ? "#FFF" : theme.text,
                }}
              >
                {pill.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Feed */}
      {isLoading ? <FeedSkeleton /> : <SDUIFeed feedNodes={feedNodes} />}

      {/* Cart Bottom Bar */}
      {totalItems > 0 && (
        <View
          className="absolute bottom-0 left-0 right-0 px-4 py-3 z-[999]"
          style={{
            backgroundColor: theme.cardBackground,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 10,
          }}
        >
          <View className="flex-row justify-between items-center mb-2.5">
            <View className="flex-row items-center gap-2">
              <View
                className="w-8 h-8 rounded-full items-center justify-center"
                style={{ backgroundColor: theme.background }}
              >
                <ShoppingBag size={16} color={theme.primary} />
              </View>
              <Text
                className="text-[14px] font-black"
                style={{ color: theme.text }}
              >
                {totalItems} {totalItems === 1 ? "item" : "items"} • ₹
                {totalPrice}
              </Text>
            </View>
            <TouchableOpacity onPress={clearCart}>
              <Text
                className="text-[11px] font-bold"
                style={{ color: theme.textSecondary }}
              >
                Clear
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="rounded-full py-3.5 items-center justify-center"
            style={{ backgroundColor: theme.primary }}
            activeOpacity={0.8}
            onPress={() => {}}
          >
            <Text className="text-white text-[13px] font-black">
              Proceed to Checkout
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Toast */}
      {toastMessage && toastType && (
        <Toast message={toastMessage} type={toastType} />
      )}
    </View>
  );
}

export default function Home() {
  const activeCampaign = useAppStore((state) => state.activeCampaign);

  const currentPayload = useMemo(
    () => getSDUIPayload(activeCampaign),
    [activeCampaign],
  );

  return (
    <SafeAreaProvider>
      <ThemeProvider payloadTheme={currentPayload.theme}>
        <SDUIScreen />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
