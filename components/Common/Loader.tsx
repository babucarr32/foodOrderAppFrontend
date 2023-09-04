import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const Loader = () => {
  return (
    <View className="absolute z-10 h-[86vh] w-full flex items-center justify-center flex-col">
      <ActivityIndicator size={"large"} color={"tomato"} />
    </View>
  );
};

export default Loader;
