import type React from "react";
import { useEffect, useRef } from "react";
import { Animated, ScrollView, View } from "react-native";
import { useDynamicTheme } from "../context/ThemeContext";

export const SkeletonPulse: React.FC<{
  style?: any;
  children?: React.ReactNode;
}> = ({ style, children }) => {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const pulse = Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0.8,
        duration: 750,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.4,
        duration: 750,
        useNativeDriver: true,
      }),
    ]);

    const animation = Animated.loop(pulse);
    animation.start();

    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[{ opacity }, style]}
      className="flex-1 w-full h-full"
    >
      {children}
    </Animated.View>
  );
};

export const CardSkeleton: React.FC = () => {
  const theme = useDynamicTheme();

  return (
    <View
      className="rounded-[16px] overflow-hidden m-[5px] flex-1 min-h-[240px]"
      style={{
        backgroundColor: theme.cardBackground,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      <View
        className="w-full h-[130px]"
        style={{ backgroundColor: theme.border }}
      />

      <View className="p-3 gap-2.5 flex-1 justify-between">
        <View className="gap-1.5">
          <View
            className="h-2.5 w-[50px] rounded-[4px]"
            style={{ backgroundColor: theme.border }}
          />
          <View
            className="h-3.5 w-full rounded-[4px]"
            style={{ backgroundColor: theme.border }}
          />
          <View
            className="h-3.5 w-[70%] rounded-[4px]"
            style={{ backgroundColor: theme.border }}
          />
        </View>

        <View className="flex-row items-center justify-between mt-1">
          <View className="gap-1">
            <View
              className="h-4 w-[45px] rounded-[4px]"
              style={{ backgroundColor: theme.border }}
            />
            <View
              className="h-2.5 w-[30px] rounded-[4px]"
              style={{ backgroundColor: theme.border }}
            />
          </View>
          <View
            className="h-8 w-[70px] rounded-[10px]"
            style={{ backgroundColor: theme.border }}
          />
        </View>
      </View>
    </View>
  );
};

export const BannerSkeleton: React.FC = () => {
  const theme = useDynamicTheme();

  return (
    <View
      className="mx-4 my-3 rounded-[20px] h-[200px] overflow-hidden"
      style={{
        backgroundColor: theme.cardBackground,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <View className="flex-1 p-5 justify-between">
        <View className="gap-1.5">
          <View
            className="h-3.5 w-[70px] rounded-full"
            style={{ backgroundColor: theme.border }}
          />
        </View>
        <View className="gap-1.5">
          <View
            className="h-6 w-[220px] rounded-[4px]"
            style={{ backgroundColor: theme.border }}
          />
          <View
            className="h-3.5 w-[160px] rounded-[4px]"
            style={{ backgroundColor: theme.border }}
          />
          <View
            className="h-8 w-[90px] rounded-full mt-1"
            style={{ backgroundColor: theme.border }}
          />
        </View>
      </View>
    </View>
  );
};

export const CollectionSkeleton: React.FC = () => {
  const theme = useDynamicTheme();

  return (
    <View className="my-3">
      <View className="flex-row justify-between items-end px-4 mb-3">
        <View className="gap-1.5">
          <View
            className="h-5 w-[140px] rounded-[4px]"
            style={{ backgroundColor: theme.border }}
          />
          <View
            className="h-3 w-[200px] rounded-[4px]"
            style={{ backgroundColor: theme.border }}
          />
        </View>
        <View
          className="h-7 w-[60px] rounded-full"
          style={{ backgroundColor: theme.border }}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 11 }}
      >
        <View className="w-[170px] mr-1">
          <CardSkeleton />
        </View>
        <View className="w-[170px] mr-1">
          <CardSkeleton />
        </View>
        <View className="w-[170px] mr-1">
          <CardSkeleton />
        </View>
      </ScrollView>
    </View>
  );
};

export const GridSkeleton: React.FC = () => {
  const theme = useDynamicTheme();

  return (
    <View className="my-3 px-4">
      <View className="flex-row justify-between items-center mb-3">
        <View
          className="h-5 w-[120px] rounded-[4px]"
          style={{ backgroundColor: theme.border }}
        />
        <View
          className="h-7 w-[60px] rounded-full"
          style={{ backgroundColor: theme.border }}
        />
      </View>

      <View className="flex-row flex-wrap -mx-[5px]">
        <View className="w-[50%] p-[5px]">
          <CardSkeleton />
        </View>
        <View className="w-[50%] p-[5px]">
          <CardSkeleton />
        </View>
        <View className="w-[50%] p-[5px]">
          <CardSkeleton />
        </View>
        <View className="w-[50%] p-[5px]">
          <CardSkeleton />
        </View>
      </View>
    </View>
  );
};

export const FeedSkeleton: React.FC = () => {
  const theme = useDynamicTheme();

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
      showsVerticalScrollIndicator={false}
    >
      <SkeletonPulse>
        <View className="pt-2 pb-24">
          <BannerSkeleton />
          <CollectionSkeleton />
          <GridSkeleton />
        </View>
      </SkeletonPulse>
    </ScrollView>
  );
};

export default FeedSkeleton;
