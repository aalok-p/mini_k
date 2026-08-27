import { AlertCircle, CheckCircle, Gift, Info } from "lucide-react-native";
import type React from "react";
import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDynamicTheme } from "../context/ThemeContext";

interface ToastProps {
  message: string;
  type: "success" | "info" | "error" | "coupon";
}

export const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const theme = useDynamicTheme();
  const insets = useSafeAreaInsets();

  const translateY = useRef(new Animated.Value(120)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        tension: 80,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateY, opacity]);

  const typeConfig = {
    success: {
      icon: <CheckCircle size={18} color="#10B981" />,
      borderColor: "#10B981",
      bgColor: "#ECFDF5",
      textColor: "#065F46",
    },
    info: {
      icon: <Info size={18} color={theme.primary} />,
      borderColor: theme.primary,
      bgColor: theme.background,
      textColor: theme.text,
    },
    coupon: {
      icon: <Gift size={18} color="#D97706" />,
      borderColor: "#F59E0B",
      bgColor: "#FEF3C7",
      textColor: "#92400E",
    },
    error: {
      icon: <AlertCircle size={18} color="#EF4444" />,
      borderColor: "#EF4444",
      bgColor: "#FEF2F2",
      textColor: "#991B1B",
    },
  };

  const config = typeConfig[type] || typeConfig.info;

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        opacity,
        bottom: insets.bottom + 100,
      }}
      className="absolute left-4 right-4 z-[10000]"
    >
      <View
        className="flex-row items-center p-4 rounded-[16px]"
        style={{
          backgroundColor: config.bgColor,
          borderLeftWidth: 4,
          borderLeftColor: config.borderColor,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 6,
        }}
      >
        <View className="mr-3">{config.icon}</View>
        <View className="flex-1">
          <Text
            className="text-[13px] font-black leading-[18px]"
            style={{ color: config.textColor }}
          >
            {message}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default Toast;
