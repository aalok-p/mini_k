import { Calendar, Star, Ticket } from "lucide-react-native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useDynamicTheme } from "../context/ThemeContext";
import type { SDUIAction, ZooTicketsBookingData } from "../types/sdui";
import { handleAction } from "../utils/actionDispatcher";

interface ZooTicketsBookingProps {
  data: ZooTicketsBookingData;
  action?: SDUIAction;
}

export const ZooTicketsBooking: React.FC<ZooTicketsBookingProps> = React.memo(
  ({ data, action }) => {
    const theme = useDynamicTheme();

    const handleBook = () => {
      if (action) {
        handleAction(action);
      }
    };

    return (
      <View
        className="mx-4 my-3 rounded-[20px] overflow-hidden"
        style={{
          backgroundColor: theme.cardBackground,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        <View className="flex-row gap-0">
          <Image
            source={{ uri: data.imageUrl }}
            className="w-[110px] h-[140px]"
            resizeMode="cover"
          />

          <View className="flex-1 p-4 justify-between">
            <View>
              <View className="flex-row items-center gap-1.5 mb-1.5">
                <View
                  className="px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: theme.background }}
                >
                  <Text
                    className="text-[9px] font-black tracking-[0.5px] uppercase"
                    style={{ color: theme.primary }}
                  >
                    Festival Special
                  </Text>
                </View>
              </View>

              <Text
                className="text-[15px] font-black leading-[20px]"
                style={{ color: theme.text }}
                numberOfLines={2}
              >
                {data.title}
              </Text>

              <View className="flex-row items-center gap-1 mt-1">
                <Star size={11} color="#FFB800" fill="#FFB800" />
                <Text
                  className="text-[11px] font-bold"
                  style={{ color: theme.textSecondary }}
                >
                  {data.rating || "4.9"} • Fast Booking
                </Text>
              </View>

              <Text
                className="text-[11px] leading-[15px] mt-1.5"
                style={{ color: theme.textSecondary }}
                numberOfLines={2}
              >
                {data.description}
              </Text>
            </View>

            <View className="flex-row items-center gap-1 mt-2">
              <Calendar size={12} color={theme.primary} />
              <Text
                className="text-[10px] font-black"
                style={{ color: theme.primary }}
              >
                {data.eventDate}
              </Text>
            </View>
          </View>
        </View>

        <View
          className="flex-row items-center justify-between px-4 py-3"
          style={{
            backgroundColor: theme.background,
            borderTopWidth: 1,
            borderTopColor: theme.border,
          }}
        >
          <View>
            <Text
              className="text-[10px] font-bold uppercase tracking-[0.5px]"
              style={{ color: theme.textSecondary }}
            >
              Starting from
            </Text>
            <Text
              className="text-[18px] font-black"
              style={{ color: theme.text }}
            >
              ₹{data.price}
              <Text className="text-[11px] font-medium"> / item</Text>
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleBook}
            className="flex-row items-center px-5 py-2.5 rounded-full"
            style={{ backgroundColor: theme.primary }}
            activeOpacity={0.8}
          >
            <Ticket size={15} color="#FFF" />
            <Text className="text-white text-[12px] font-black ml-1.5">
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

export default ZooTicketsBooking;
