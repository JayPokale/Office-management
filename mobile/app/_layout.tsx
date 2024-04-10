import { Stack } from "expo-router";
import { Image, Text, View } from "react-native";

const Title = () => {
  return (
    <View>
      <Text style={{fontSize: 18, fontWeight: "bold"}}>SHRI SAI CONTROLS</Text>
      {/* <Image style={{ width: 50, height: 50 }} /> */}
    </View>
  );
};

const RootLayoutNav = () => {
  return (
    <Stack
      screenOptions={() => ({
        headerTitle: () => <Title />,
        contentStyle: { backgroundColor: "#ffffff" },
      })}
    />
  );
};

export default RootLayoutNav;
