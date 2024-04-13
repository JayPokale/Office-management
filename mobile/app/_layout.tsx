import SignInScreen from "@/components/SignInScreen";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { Stack } from "expo-router";
import { Text, View } from "react-native";

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

const RootLayoutNav = () => {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
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
    </ClerkProvider>
  );
};

export default RootLayoutNav;
