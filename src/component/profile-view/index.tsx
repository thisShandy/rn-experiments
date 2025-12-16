import { StyleSheet } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

import { useProFileAnimation } from "../../hooks/use-profile-animation.ts";

import HeaderBack from "../header-back";
import ProfileDefault from "../profile-default";

const ProfileView = () => {
  const {
    scrollRef,
    onScroll,
    scrollGesture,
    animatedStyles,
  } = useProFileAnimation();

  let isDragging = false;

  return (
    <GestureDetector gesture={scrollGesture}>
      <Animated.ScrollView
        ref={scrollRef}
        onScroll={onScroll}
        bounces
        alwaysBounceVertical
        overScrollMode="always"
        scrollEventThrottle={16}
        onScrollBeginDrag={() => {
          isDragging = true;
        }}
        onScrollEndDrag={() => {
          isDragging = false;
        }}
        onMomentumScrollEnd={(e) => {
          const y = e.nativeEvent.contentOffset.y;

          if (y < 0 && !isDragging) {
            scrollRef.current?.scrollTo({
              y: 0,
              animated: true,
            });
          }
        }}
        contentContainerStyle={{
          alignItems: "flex-start",
          justifyContent: "flex-start",
          width: "100%",
          minHeight: "400%",
        }}
      >
        <HeaderBack />
        <ProfileDefault animatedStyles={animatedStyles} />
      </Animated.ScrollView>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({});

export default ProfileView;