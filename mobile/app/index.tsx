import SignInScreen from "@/components/SignInScreen";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { SafeAreaView, Text, StyleSheet } from "react-native";

const Home = () => {
  return <Redirect href={"/materials"} />;
  // return (
  //   <ClerkProvider
  //     publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
  //   >
  //     <SafeAreaView>
  //       <SignedIn>
  //         <Redirect href={"/materials"} />
  //       </SignedIn>
  //       <SignedOut>
  //         <SignInScreen />
  //       </SignedOut>
  //     </SafeAreaView>
  //   </ClerkProvider>
  // );
};

export default Home;
