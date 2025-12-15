import { ScrollView, StatusBar, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import HeaderBack from "./src/component/header-back";
import ProfileDefault from "./src/component/profile-default";

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "flex-start",

          width: "100%",
          minHeight: "100%"
        }}
      >
        <HeaderBack />
        <ProfileDefault />
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",

    width: "100%",
    height: "100%"
  },

  text: {
    color: "white"
  }
});

export default App;
