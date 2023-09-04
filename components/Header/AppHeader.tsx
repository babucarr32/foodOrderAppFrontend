import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import useLogout from "../../hooks/useLogout";
import {
  useNavigation,
  ParamListBase,
  NavigationProp,
} from "@react-navigation/native";

const AppHeader: React.FC<{ title: string }> = ({ title }) => {
  const { Logout } = useLogout();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  // const goLogin = () => {
  //   navigation.navigate("Login");
  // };
  // Logout(() => goLogin())

  return (
    <SafeAreaView>
      <View className="text-center flex items-center justify-between flex-row w-full">
        <Text className="text-center font-extrabold text-xl">{title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Account")}>
          <Ionicons name={"person-circle-outline"} size={28} color={"black"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AppHeader;
