import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USERS, LOGIN } from "../graphql/query";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LoginRootStackParamList } from "../App";
import FormContainer from "../components/Common/FormContainer";

type Props = NativeStackScreenProps<LoginRootStackParamList, "Login">;

const LoginPage = ({ route, navigation }: Props) => {
  const handleNavigate = (path: "HomeTab" | "Login" | "Signup") => {
    navigation.navigate(path);
  };

  return <FormContainer isSignup={false} handleNavigate={handleNavigate} />;
};

export default LoginPage;
