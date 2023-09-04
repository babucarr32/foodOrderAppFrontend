import { View, ScrollView, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppCard, {
  FetchedUser,
  GetUserQueryVariables,
} from "../components/Common/AppCard";
import useFavorites from "../hooks/useFavorites";
import { staticImages } from "../lib/ImagePaths";
import { GET_USER } from "../graphql/query";
import { useQuery } from "@apollo/client";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useAtom } from "jotai";
import { isLoadingAtom, userIdAtom } from "../jotaiAtoms/jotaiAtoms";
import { ActivityIndicator } from "react-native";
import Loader from "../components/Common/Loader";

type Props = NativeStackScreenProps<RootStackParamList, "Favorites">;

const FavoritesScreen = ({ route, navigation }: Props) => {
  const { favorites, handleUpdateImageFav } = useFavorites(staticImages);
  const [userId] = useAtom(userIdAtom);
  const [isLoading] = useAtom(isLoadingAtom);

  const { data } = useQuery<{ user: FetchedUser }, GetUserQueryVariables>(
    GET_USER,
    {
      variables: {
        id: userId,
      },
    }
  );

  useEffect(() => {
    handleUpdateImageFav(data?.user);
  }, [data?.user]);

  if (!favorites) return <Loader />;

  return (
    <>
      {isLoading && <Loader />}
      <View>
        <View className="px-3">
          <ScrollView>
            <View
              className="flex flex-wrap justify-between"
              style={{ flexDirection: "row" }}
            >
              <AppCard imagesData={favorites} />
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default FavoritesScreen;
