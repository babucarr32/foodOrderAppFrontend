import { View, SafeAreaView, ScrollView, Text } from "react-native";
import { staticImages, staticImagesType } from "../../lib/ImagePaths";
import AppCard, { FetchedUser, GetUserQueryVariables } from "../Common/AppCard";
import { GET_USER } from "../../graphql/query";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import useFavorites from "../../hooks/useFavorites";
import { useAtom } from "jotai";
import { userIdAtom } from "../../jotaiAtoms/jotaiAtoms";
import Loader from "../Common/Loader";

const AppBody = () => {
  const [images, setImages] = useState<staticImagesType[]>();
  const { handleUpdateImageFav } = useFavorites(staticImages);
  const [userId] = useAtom(userIdAtom);

  const { loading, error, data } = useQuery<
    { user: FetchedUser },
    GetUserQueryVariables
  >(GET_USER, { variables: { id: userId } });

  useEffect(() => {
    const res = handleUpdateImageFav(data?.user);
    if (res) setImages(res);
  }, [data]);

  if (loading || !images) return <Loader />;
  if (error) return <Text>Ohh ohh something has gone wrong.</Text>;

  return (
    <View className="px-3">
      <ScrollView>
        <View className="flex flex-wrap justify-between flex-row">
          <AppCard imagesData={images as staticImagesType[]} />
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBody;
