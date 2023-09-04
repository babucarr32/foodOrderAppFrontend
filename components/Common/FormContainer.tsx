import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useMutation } from "@apollo/client";
import { LOGIN, SIGNUP_USER, VERIFY_TOKEN } from "../../graphql/query";
import * as SecureStore from "expo-secure-store";
import { userIdAtom } from "../../jotaiAtoms/jotaiAtoms";
import { useAtom } from "jotai";

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: string): Promise<string | false> {
  let result = await SecureStore.getItemAsync(key);
  return result ? result : false;
}

interface FormContainerType {
  isSignup: boolean;
  handleNavigate: (path: "HomeTab" | "Login" | "Signup") => void;
}

const FormContainer: React.FC<FormContainerType> = ({
  handleNavigate,
  isSignup,
}) => {
  const [
    loginUser,
    { data: loginResult, error: loginError, loading: loginLoading },
  ] = useMutation(LOGIN);
  const [
    signupUser,
    { data: signupResult, error: signupError, loading: signupLoading },
  ] = useMutation(SIGNUP_USER);
  const [userId, setUserId] = useAtom(userIdAtom);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const [verifyJWTToken] = useMutation(VERIFY_TOKEN);

  useEffect(() => {
    const getVal = async () => {
      const result = await getValueFor("foodOrder");
      if (result) {
        await triggerSetUserId(result);
        userId && handleNavigate("HomeTab");
      }
    };
    getVal();
  }, [userId]);

  useEffect(() => {
    if (JSON.stringify(loginResult) == JSON.stringify({ login: null })) {
      setErrMsg("Username or password incorrect.");
    }
  }, [loginResult]);

  useEffect(() => {
    const loginFunc = async () => {
      if (loginResult?.login?.username) {
        save("foodOrder", loginResult?.login?.accessToken);
        await triggerSetUserId(loginResult?.login?.accessToken);
        resetInputs();
        handleNavigate("HomeTab");
      }
    };
    loginFunc();
  }, [loginResult]);

  useEffect(() => {
    const signupFunc = async () => {
      if (signupResult?.createAccount?.username) {
        save("foodOrder", signupResult?.createAccount?.accessToken);
        await triggerSetUserId(signupResult?.createAccount?.accessToken);
        resetInputs();
        handleNavigate("HomeTab");
      }
    };
    signupFunc();
  }, [signupResult]);

  const triggerSetUserId = async (tkn: string) => {
    const isVerified = await verifyJWTToken({
      variables: { token: tkn },
    });
    if (typeof isVerified.data.verifyJWTToken == "string") {
      setUserId(isVerified.data.verifyJWTToken);
    }
  };

  const resetInputs = () => {
    setUsername("");
    setPassword("");
  };

  const handleSetUsername = (text: string) => {
    setUsername(text);
    setErrMsg("");
  };

  const handleSetPassword = (text: string) => {
    setPassword(text);
    setErrMsg("");
  };

  const handleLogin = async () => {
    if (isSignup) {
      await signupUser({
        variables: {
          credentials: {
            password: password,
            username: username,
          },
        },
      });
    } else {
      await loginUser({
        variables: {
          credentials: {
            password: password,
            username: username,
          },
        },
      });
    }
  };

  return (
    <View className="flex items-center justify-center h-full">
      <Image
        className="object-fill w-full h-full absolute "
        source={require("../../assets/images/loginBg.jpg")}
      />
      <View className="bg-black opacity-90 w-full h-full absolute"></View>
      <View className="text-white w-full flex items-center gap-5 px-4">
        <Text className="text-2xl text-white font-extrabold">
          {isSignup ? "Sign up" : "Sign in"}
        </Text>
        <Text className="text-red-500">{errMsg}</Text>
        <TextInput
          className="h-14 w-full text-white border border-white rounded-lg pl-4"
          placeholder="Username"
          placeholderTextColor="white"
          onChangeText={(e) => handleSetUsername(e)}
          value={username}
        />
        <View className="w-full relative">
          <TextInput
            className="h-14 w-full text-white border border-white rounded-lg pl-4"
            placeholder="Password"
            placeholderTextColor="white"
            secureTextEntry={!showPassword}
            onChangeText={(e) => handleSetPassword(e)}
            value={password}
          />

          <View className="absolute right-2 top-4">
            <Ionicons
              onPress={() => setShowPassword(!showPassword)}
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={24}
              color={"gray"}
            />
          </View>
        </View>
        <TouchableOpacity
          className={`w-full h-14 ${
            loginLoading || signupLoading ? "bg-slate-300" : "bg-white"
          } rounded-lg flex justify-center items-center`}
          onPress={() => handleLogin()}
          disabled={loginLoading || signupLoading}
          activeOpacity={1}
        >
          <Text className="text-black font-bold">
            {" "}
            {isSignup ? "Signup" : "Login"}
          </Text>
        </TouchableOpacity>
        {isSignup ? (
          <Text className="text-white">
            Already a member ?{" "}
            <Text
              className="text-blue-500"
              onPress={() => handleNavigate("Login")}
            >
              Login
            </Text>
          </Text>
        ) : (
          <Text className="text-white">
            Don't have a account?{" "}
            <Text
              className="text-blue-500"
              onPress={() => handleNavigate("Signup")}
            >
              Signup
            </Text>
          </Text>
        )}
      </View>
    </View>
  );
};

export default FormContainer;
