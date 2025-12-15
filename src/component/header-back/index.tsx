import { View, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, } from "react-native-reanimated";
import { CaretLeftIcon } from "phosphor-react-native";

const HeaderBack = () => {
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <SafeAreaView style={styles.warpper}>
      <View style={styles.container}>
        <Pressable
          style={styles.back}
          onPressIn={() => {
            opacity.value = withTiming(0.5, { duration: 120 });
          }}
          onPressOut={() => {
            opacity.value = withTiming(1, { duration: 120 });
          }}
        >
          <Animated.View style={animatedStyle}>
            <CaretLeftIcon color="#FFFFFF" weight="bold" size={20} />
          </Animated.View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  warpper: {
    position: "absolute",

    width: "100%",

    zIndex: 1,
  },

  container: {
    alignItems: "flex-start",
    justifyContent: "center",

    width: "100%",
    height: 48,
    paddingHorizontal: 12
  },

  back: {
    alignItems: "center",
    justifyContent: "center",

    width: 32,
    height: 32,

    borderRadius: 99,
    backgroundColor: "rgba(0, 0, 0, .5)",

    cursor: "pointer"
  },

  text: {},
});

export default HeaderBack;
