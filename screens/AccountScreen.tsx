import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { userIdAtom } from "../jotaiAtoms/jotaiAtoms";
import { useAtom } from "jotai";
import {
  FetchedUser,
  GetUserQueryVariables,
} from "../components/Common/AppCard";
import { EDIT_USER, GET_USER } from "../graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import useLogout from "../hooks/useLogout";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

const AccountScreen = () => {
  const [username, setUsername] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const [userId, setUserId] = useAtom(userIdAtom);
  const [showCurntPassword, setShowCurntPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const { data } = useQuery<{ user: FetchedUser }, GetUserQueryVariables>(
    GET_USER,
    { variables: { id: userId } }
  );
  const [
    updateAccount,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(EDIT_USER);

  const { Logout } = useLogout();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const goLogin = () => {
    navigation.navigate("Login");
  };

  const resetErrMsg = () => {
    setErrMsg("");
  };

  useEffect(() => {
    if (data) {
      setUsername(data.user.username as string);
    }
  }, [data]);

  useEffect(() => {
    if (updateData) {
      ToastAndroid.show("Update successful!", ToastAndroid.SHORT);
    }
    if (JSON.stringify(updateData) == JSON.stringify({ editAccount: null })) {
      setErrMsg("Invalid password.");
    }
  }, [updateData]);

  const handleSetUsername = (text: string) => {
    setUsername(text);
    resetErrMsg();
  };

  const handleSetCurntPassword = (text: string) => {
    setCurrentPassword(text);
    resetErrMsg();
  };

  const handleSetNewPassword = (text: string) => {
    setNewPassword(text);
    resetErrMsg();
  };

  const handleUpdateLogin = async () => {
    await updateAccount({
      variables: {
        credentials: {
          currentPassword: currentPassword,
          newPassword: newPassword,
          user_id: userId,
          username: username,
        },
      },
    });
  };

  return (
    <View className="flex flex-col items-center justify-center w-full h-full px-3">
      <View className="w-full">
        <TouchableOpacity className="w-20 rounded-lg mx-auto bg-red-200 p-3 mb-10 flex items-center justify-center">
          <Text
            className="text-red-500"
            onPress={() => Logout(() => goLogin())}
          >
            Logout
          </Text>
        </TouchableOpacity>

        <Text className="mx-auto mb-3 font-bold text-lg">Edit Account</Text>
        {errMsg && <Text className="text-red-500 mx-auto">{errMsg}</Text>}
        <View>
          <Text className="mb-2">Username</Text>
          <TextInput
            className="h-14 w-full text-black border-slate-200 border-2 rounded-lg pl-4 mb-5"
            placeholder="Username"
            onChangeText={(e) => handleSetUsername(e)}
            value={username}
          />
        </View>
        <Text className="mb-2">Change Password</Text>
        <View className="w-full relative ">
          <TextInput
            className="h-14 w-full text-black border-slate-200 border-2  rounded-lg pl-4 mb-5"
            placeholder="Current Password"
            secureTextEntry={!showCurntPassword}
            onChangeText={(e) => handleSetCurntPassword(e)}
            value={currentPassword}
          />

          <View className="absolute right-2 top-4">
            <Ionicons
              onPress={() => setShowCurntPassword(!showCurntPassword)}
              name={showCurntPassword ? "eye-outline" : "eye-off-outline"}
              size={24}
              color={"gray"}
            />
          </View>
        </View>
        <View>
          <TextInput
            className="h-14 w-full text-black border-slate-200 border-2  rounded-lg pl-4 mb-5"
            placeholder="New Password"
            secureTextEntry={!showNewPassword}
            onChangeText={(e) => handleSetNewPassword(e)}
            value={newPassword}
          />

          <View className="absolute right-2 top-4">
            <Ionicons
              onPress={() => setShowNewPassword(!showNewPassword)}
              name={showNewPassword ? "eye-outline" : "eye-off-outline"}
              size={24}
              color={"gray"}
            />
          </View>
        </View>

        <TouchableOpacity
          className={`w-full h-14 ${
            updateLoading ? "bg-blue-200" : "bg-white"
          } rounded-lg flex justify-center items-center`}
          onPress={() => handleUpdateLogin()}
          disabled={updateLoading}
          activeOpacity={1}
        >
          <Text className="text-blue-500 font-bold">
            {updateLoading ? "Updating..." : "Update"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountScreen;
