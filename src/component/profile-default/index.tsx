import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Shadow } from "react-native-shadow-2";

const ProfileDefault = () => {
  return (
    <ImageBackground
      style={styles.container}
      imageStyle={styles.containerImage}
      resizeMode="cover"
      source={require("./assets/profile.jpg")}
    >
      <Shadow
        offset={[0, -26]}
        distance={128}
        startColor="rgba(0, 0, 0, 0.65)"
        endColor="rgba(0, 0, 0, 0)"
        style={styles.shadow}
      >
        <View style={styles.content}>
          <Text style={styles.contentName}>John Doe</Text>
          <View style={styles.contentInfo}>
            <Text style={styles.contentGeneral}>@dj_doe · +995 599 099 452</Text>
            <Text style={styles.contentStats}>14 posts · 14m views · 15 followers</Text>
          </View>
        </View>
      </Shadow>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-end",

    width: "100%",
    height: "65%",

    backgroundColor: "red",

    overflow: "hidden"
  },

  containerImage: {
    height: "100%"
  },

  shadow: {
    width: Dimensions.get("window").width,
    paddingBottom: 24,
    marginBottom: -24
  },

  content: {
    alignItems: "center",
    gap: 6,

    width: "100%",
    paddingBottom: 32,
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
  }
});

export default ProfileDefault;