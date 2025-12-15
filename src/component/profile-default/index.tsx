import type { FC } from "react";

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";
import { ChatCircleIcon, UserPlusIcon } from "phosphor-react-native";
import { Shadow } from "react-native-shadow-2";

import ButtonUi from "../../kit/button-ui";
import {
  INITIAL_HEIGHT,
  INITIAL_WIDTH,
} from "../../hooks/use-profile-animation.ts";

interface ProfileDefaultProps {
  animatedStyles: {
    container: AnimatedStyle<ViewStyle>;
    photoWrapper: AnimatedStyle<ViewStyle>;
    photo: AnimatedStyle<ImageStyle>;
    text: AnimatedStyle<TextStyle>;
    shadow: AnimatedStyle;
  }
}

const ProfileDefault: FC<ProfileDefaultProps> = ({ animatedStyles }) => {
  return (
    <Animated.View style={[styles.container, animatedStyles.container]}>
      <Animated.View style={[styles.photoWrapper, animatedStyles.photoWrapper]}>
        <Animated.Image
          style={[styles.photo, animatedStyles.photo]}
          source={require("./assets/profile_2.jpg")}
          resizeMode="cover"
        />
      </Animated.View>
      <Shadow
        offset={[0, -12]}
        distance={256}
        startColor="rgba(0, 0, 0, 0.65)"
        endColor="rgba(0, 0, 0, 0)"
        style={styles.shadow}
      >
        <View style={styles.content}>
          <Animated.Text style={[styles.contentName, animatedStyles.text]}>John Doe</Animated.Text>
          <View style={styles.contentInfo}>
            <Animated.Text style={[styles.contentGeneral, animatedStyles.text]}>@dj_doe · +995 599 099 452</Animated.Text>
            <Animated.Text style={[styles.contentStats, animatedStyles.text]}>14 posts · 14m views · 15 followers</Animated.Text>
          </View>
        </View>
        <View style={styles.control}>
          <ButtonUi style={{ width: "48%" }}>
            <ChatCircleIcon size={20} weight="fill" />
            <Text style={styles.controlText}>Message</Text>
          </ButtonUi>
          <ButtonUi style={{ width: "48%" }}>
            <UserPlusIcon size={20} weight="fill" />
            <Text style={styles.controlText}>Follow</Text>
          </ButtonUi>
        </View>
      </Shadow>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-end",

    width: "100%",
    height: INITIAL_HEIGHT,

    backgroundColor: "transparent",

    overflow: "hidden"
  },

  photoWrapper: {
    position: "absolute",
    top: 0,

    width: INITIAL_WIDTH,
    height: INITIAL_HEIGHT
  },

  photo: {
    width: "100%",
    height: "100%"
  },

  shadow: {
    gap: 12,

    width: Dimensions.get("window").width,
    paddingBottom: 24,
    marginBottom: -24
  },

  content: {
    alignItems: "center",
    gap: 6,

    width: "100%",
  },

  contentName: {
    fontWeight: "700",
    fontSize: 32,

    color: "white",
  },

  contentInfo: {
    alignItems: "center",
    gap: 2,
  },

  contentGeneral: {
    fontWeight: "400",
    fontSize: 14,

    color: "white",
  },

  contentStats: {
    fontWeight: "400",
    fontSize: 14,

    color: "white",

    opacity: .75
  },

  control: {
    flexDirection: "row",
    justifyContent: "space-between",

    width: "100%",

    paddingHorizontal: 12,
    paddingBottom: 24,
  },

  controlText: {
    fontWeight: "600",
    fontSize: 16,
  }
});

export default ProfileDefault;