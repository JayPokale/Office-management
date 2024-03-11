import { Stack } from "expo-router";

const RootLayoutNav = () => {
  return (
    <Stack
      screenOptions={() => ({
        headerTitle: "Company Name",
      })}
    />
  );
};

export default RootLayoutNav;
