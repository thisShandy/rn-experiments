import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  interpolateColor,
  ReduceMotion,
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { Gesture } from "react-native-gesture-handler";

export const INITIAL_WIDTH = Dimensions.get("window").width;
export const INITIAL_HEIGHT = Dimensions.get("window").height * .65;

const LIMIT = 128;
const END = 126;

const ARM_AFTER_PX = 24;
const PULL_RESET = 48;

const JELLY_HIDE = Easing.exp;

const TIMING_HIDE_CONFIG = {
  duration: 250,
  reduceMotion: ReduceMotion.System,
  easing: JELLY_HIDE,
};

const JELLY_SHOW = Easing.in(Easing.exp);

const TIMING_SHOW_CONFIG = {
  duration: 150,
  reduceMotion: ReduceMotion.System,
  easing: JELLY_SHOW,
};

export const useProFileAnimation = () => {
  const insets = useSafeAreaInsets();

  const ref = useAnimatedRef<Animated.ScrollView>();

  const scrollY = useSharedValue(0);
  const scrolled = useSharedValue(false);

  const animationProg = useSharedValue(0);

  const armed = useSharedValue(false);
  const atTop = useSharedValue(true);

  const resetToExpanded = () => {
    "worklet";
    scrolled.value = false;
    scrollY.value = 0;
    armed.value = false;

    animationProg.value = withTiming(0, TIMING_SHOW_CONFIG);

    scrollTo(ref, 0, 0, false);
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      const y = e.contentOffset.y;

      atTop.value = y <= 0.5;

      if (!scrolled.value) {
        if (scrollY.value < LIMIT) {
          scrollY.value += y;
          scrollTo(ref, 0, 0, false);
        } else {
          scrolled.value = true;
          armed.value = false;
        }
        return;
      }

      if (!armed.value && y >= ARM_AFTER_PX) {
        armed.value = true;
      }

      if (armed.value && y <= -PULL_RESET) {
        resetToExpanded();
      }
    },
  });

  useAnimatedReaction(
    () => scrollY.value >= LIMIT * .4,
    (reached) => {
      animationProg.value = withTiming(reached ? 1 : 0, TIMING_HIDE_CONFIG);
    }
  );

  const containerAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      animationProg.value,
      [0, 1],
      [INITIAL_HEIGHT, 392],
      Extrapolation.CLAMP
    );

    return { height };
  });

  const photoWrapperAnimatedStyle = useAnimatedStyle(() => {
    const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

    const p = clamp01(animationProg.value);

    const w0 = INITIAL_WIDTH;
    const h0 = INITIAL_HEIGHT;

    const splitRaw = (h0 - w0) / (h0 - END);
    const split = clamp01(splitRaw);

    const top = interpolate(
      p,
      [0, 1],
      [0, insets.top + 56],
      Extrapolation.CLAMP
    );

    const height = interpolate(
      p,
      [0, split, 1],
      [h0, w0, END],
      Extrapolation.CLAMP
    );

    const width = interpolate(
      p,
      [0, split, 1],
      [w0, w0, END],
      Extrapolation.CLAMP
    );

    const borderRadius = interpolate(animationProg.value, [0, 1], [0, 999]);

    return { top, width, height, borderRadius };
  });

  const photoAnimatedStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(animationProg.value, [0, 1], [0, 999]);

    return { borderRadius };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      animationProg.value,
      [0, 1],
      ["#FFFFFF", "#000000"]
    );

    return {
      color
    };
  });

  const shadowAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animationProg.value, [0, 1], [1, 0]);

    return { opacity };
  });

  // Gesture

  const pullY = useSharedValue(0);

  const scrollGesture = Gesture.Native();

  const pullToReturnGesture = Gesture.Pan()
    .simultaneousWithExternalGesture(scrollGesture)
    .activeOffsetY(10)
    .failOffsetX([-10, 10])
    .onBegin(() => {
      pullY.value = 0;
    })
    .onUpdate((e) => {
      if (!scrolled.value || !atTop.value) return;
      if (e.translationY <= 0) return;

      pullY.value = e.translationY;
    })
    .onEnd((e) => {
      if (!scrolled.value || !atTop.value) return;

      const shouldReturn =
        pullY.value > PULL_RESET || e.velocityY > 1200;

      pullY.value = 0;

      if (shouldReturn) {
        resetToExpanded();
      }
    });

  const composedGesture = Gesture.Simultaneous(
    scrollGesture,
    pullToReturnGesture
  );

  return {
    scrollRef: ref,
    onScroll,
    scrollGesture: composedGesture,
    animatedStyles: {
      container: containerAnimatedStyle,
      photoWrapper: photoWrapperAnimatedStyle,
      photo: photoAnimatedStyle,
      text: textAnimatedStyle,
      shadow: shadowAnimatedStyle
    }
  };
};