import type { FC, PropsWithChildren } from "react";

import {
  Text,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface ButtonUiProps {
  style?: StyleProp<ViewStyle>;
  text?: string;
}

const ButtonUi: FC<PropsWithChildren<ButtonUiProps>> = ({
  children, style, text
}) => {
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Pressable
      style={[styles.wrapper, style]}
      onPressIn={() => {
        opacity.value = withTiming(0.5, { duration: 120 });
      }}
      onPressOut={() => {
        opacity.value = withTiming(1, { duration: 120 });
      }}
    >
      <Animated.View style={[animatedStyle, styles.button]}>
        {children || (
          <Text>{text}</Text>
        )}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,

    width: "100%",
    height: 36,

    borderRadius: 6,
    backgroundColor: "#D9D9D9",
  }
});

export default ButtonUi;