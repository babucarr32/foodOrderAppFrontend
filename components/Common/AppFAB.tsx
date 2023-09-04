import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const AppFAB = () => {
  return (
    <View>
      <TouchableOpacity className="absolute right-4 bottom-10 w-14 h-14 bg-red-200 rounded-full flex items-center justify-center">
        <Ionicons name={"send"} size={24} color={"tomato"} />
      </TouchableOpacity>
    </View>
  );
};

export default AppFAB;
