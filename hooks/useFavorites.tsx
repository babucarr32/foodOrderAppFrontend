import React, { useState } from "react";
import { FetchedUser } from "../components/Common/AppCard";
import { staticImagesType } from "../lib/ImagePaths";

const useFavorites = (images: staticImagesType[]) => {
  const [favorites, setFavorites] = useState<staticImagesType[]>();

  const handleUpdateImageFav = (userObj: FetchedUser | undefined) => {
    let newImgs = [...images];
    if (userObj) {
      const getFavs = [];
      if (userObj?.favorites?.length == 0) {
        for (const img of newImgs) {
          img.favorite = false;
        }
      } else {
        for (const img of newImgs) {
          for (const fav of userObj.favorites || []) {
            if (fav.foodName == img.dish) {
              img.favorite = true;
              getFavs.push(img);
              break;
            } else {
              img.favorite = false;
            }
          }
        }
      }
      setFavorites(getFavs);
      return newImgs;
    }
  };

  return { favorites, handleUpdateImageFav };
};

export default useFavorites;
