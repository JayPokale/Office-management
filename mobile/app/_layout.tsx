import { Stack } from "expo-router";

const RootLayoutNav = () => {
  return (
    <Stack
      screenOptions={() => ({
        headerTitle: "Company Name",
        contentStyle: {backgroundColor: "#ffffff"}
      })}
    />
  );
};

export default RootLayoutNav;
