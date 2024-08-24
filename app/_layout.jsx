import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import "react-native-url-polyfill/auto";
import { Stack } from "expo-router";

import GlobalProvider from "@/context/GlobalProvider";
import CustomSplashScreen from "@/components/CustomSplashScreen";

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      const timeoutId = setTimeout(() => {
        setIsSplashVisible(false);
      }, 7500);

      return () => clearTimeout(timeoutId);
    }
  }, [fontsLoaded, error]);

  if (isSplashVisible) {
    return <CustomSplashScreen />;
  }

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </GlobalProvider>
  );
};

export default RootLayout;
