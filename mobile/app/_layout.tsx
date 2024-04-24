import SignInScreen from "@/components/SignInScreen";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { Stack, usePathname } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createContext, useEffect, useState } from "react";

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const Title = () => {
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        SHRI SAI CONTROLS
      </Text>
      {/* <Image style={{ width: 50, height: 50 }} /> */}
    </View>
  );
};

export const LoaderContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>>
>(() => {});

const RootLayoutNav = () => {
  const [loaderState, setLoaderState] = useState(true);

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <LoaderContext.Provider value={setLoaderState}>
        <SafeAreaView
          style={[styles.overlay, { display: loaderState ? "flex" : "none" }]}
        >
          <ActivityIndicator
            size="large"
            color="#000"
            style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
          />
        </SafeAreaView>
        <SignedIn>
          <Stack
            screenOptions={() => ({
              headerTitle: () => <Title />,
              contentStyle: { backgroundColor: "#ffffff" },
              headerBackVisible: false,
            })}
          />
        </SignedIn>
        <SignedOut>
          <SignInScreen />
        </SignedOut>
      </LoaderContext.Provider>
    </ClerkProvider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.6)",
    position: "absolute",
    zIndex: 10,
    height: "100%",
    width: "100%",
  },
});

export default RootLayoutNav;
