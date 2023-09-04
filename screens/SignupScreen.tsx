import { View, Text } from "react-native";
import React from "react";
import LoginPage from "./LoginPage";
import FormContainer from "../components/Common/FormContainer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LoginRootStackParamList } from "../App";

type Props = NativeStackScreenProps<LoginRootStackParamList, "Signup">;

const SignupScreen = ({ route, navigation }: Props) => {
  const handleNavigate = (path: "Home" | "Login" | "Signup") => {
    navigation.navigate(path);
  };

  return <FormContainer isSignup={true} handleNavigate={handleNavigate} />;
};

export default SignupScreen;
