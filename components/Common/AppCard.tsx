import {
  View,
  Text,
  Image,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_TO_FAV, MAKE_ORDER, REMOVE_FROM_Fav } from "../../graphql/query";
import { staticImagesType } from "../../lib/ImagePaths";
import useFavorites from "../../hooks/useFavorites";
import { isLoadingAtom, userIdAtom } from "../../jotaiAtoms/jotaiAtoms";
import { useAtom } from "jotai";

interface AppCard {
  imagesData: staticImagesType[];
}

export interface GetUserQueryVariables {
  id: string;
}

export interface FetchedUser {
  id?: string;
  username?: string;
  password?: string;
  currentChoice?: string;
  favorites?: FavFood[];
}

interface FavFood {
  food_id: string;
  foodName: string;
}

const AppCard: React.FC<AppCard> = ({ imagesData }) => {
  const [images, setImages] = useState<staticImagesType[]>([]);
  const { handleUpdateImageFav } = useFavorites(images);
  const [userId] = useAtom(userIdAtom);
  const [, setIsLoading] = useAtom(isLoadingAtom);
  const [addToFavDish, { data: addToFavResult, loading: addToFavLoading }] =
    useMutation(ADD_TO_FAV);
  const [
    removeFromFavDish,
    { data: removeFromFavResult, loading: removeFromFavLoading },
  ] = useMutation(REMOVE_FROM_Fav);
  const [makeOrder, { data: makeOrderResult }] = useMutation(MAKE_ORDER);

  useEffect(() => {
    setImages([...imagesData]);
  }, [imagesData]);

  useEffect(() => {
    setIsLoading(addToFavLoading || removeFromFavLoading);
  }, [addToFavLoading, removeFromFavLoading]);

  useEffect(() => {
    if (addToFavResult) {
      const res = handleUpdateImageFav(addToFavResult);
      if (res) setImages([...res]);
    }
  }, [addToFavResult]);

  useEffect(() => {
    if (removeFromFavResult) {
      const res = handleUpdateImageFav(removeFromFavResult);
      if (res) setImages([...res]);
    }
  }, [removeFromFavResult]);

  useEffect(() => {
    if (makeOrderResult) showToast();
  }, [makeOrderResult]);

  const showToast = () => {
    ToastAndroid.show("Order made successfully!", ToastAndroid.SHORT);
  };

  const handleAddToFav = async (isFav: boolean, dish: string) => {
    if (isFav) {
      await removeFromFavDish({
        variables: {
          info: {
            food_name: dish,
            user_id: userId,
          },
        },
      });
    } else {
      await addToFavDish({
        variables: {
          info: {
            user_id: userId,
            food_name: dish,
          },
        },
      });
    }
  };

  const handleMakeOrder = async (dish: string) => {
    await makeOrder({
      variables: {
        info: {
          user_id: userId,
          food_name: dish,
        },
      },
    });
  };

  return (
    <>
      {!images.length && (
        <Text className="mx-auto">
          Please, at least select one dish as your favorite.
        </Text>
      )}
      {images.map((item) => (
        <View
          key={item.dish}
          className=" border-2 border-slate-200 rounded-lg drop-shadow-lg p-2 mt-2 relative w-[49%]"
        >
          <View className="w-full h-36 ">
            <Image className="w-full h-full rounded-full" source={item.src} />
          </View>
          <View className="absolute top-2 right-2">
            <Ionicons
              onPress={() => handleAddToFav(item.favorite, item.dish)}
              name={item.favorite ? "heart" : "heart-outline"}
              size={24}
              color={"tomato"}
            />
          </View>
          <View className="flex items-center flex-col">
            <Text className="text-center my-3">{item.dish}</Text>
            <TouchableOpacity
              onPress={() => handleMakeOrder(item.dish)}
              className="p-3 bg-red-200 rounded-xl w-auto"
            >
              <Text className="text-red-500">Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </>
  );
};

export default AppCard;
