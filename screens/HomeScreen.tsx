import { ActivityIndicator, SafeAreaView, View } from "react-native";
import React from "react";
import AppBody from "../components/Body/AppBody";
import { useAtom } from "jotai";
import { isLoadingAtom } from "../jotaiAtoms/jotaiAtoms";
import Loader from "../components/Common/Loader";

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [isLoading] = useAtom(isLoadingAtom);

  return (
    <View>
      {isLoading && <Loader />}
      <AppBody />
    </View>
  );
};

export default HomeScreen;
