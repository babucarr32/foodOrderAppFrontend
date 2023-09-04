export interface staticImagesType {
  dish: string;
  alt: string;
  src: any;
  favorite: boolean;
}

export const staticImages: staticImagesType[] = [
  {
    dish: "Benachin",
    alt: "Image of Benachin",
    src: require("../assets/images/benachin.jpg"),
    favorite: false,
  },
  {
    dish: "Domoda",
    alt: "Image of Domoda",
    src: require("../assets/images/domoda.jpg"),
    favorite: false,
  },
  {
    dish: "Mbahal",
    alt: "Image of Mbahal",
    src: require("../assets/images/mbahal.jpg"),
    favorite: false,
  },
  {
    dish: "Yassa",
    alt: "Image of Yassa",
    src: require("../assets/images/yassa.jpg"),
    favorite: false,
  },
  {
    dish: "SuperKanja",
    alt: "Image of SuperKanja",
    src: require("../assets/images/superKanja.jpeg"),
    favorite: false,
  },
];
