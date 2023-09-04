import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "./screens/HomeScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import AppHeader from "./components/Header/AppHeader";
import LoginPage from "./screens/LoginPage";
import APOLLOProvider from "./components/Providers/APOLLOProvider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignupScreen from "./screens/SignupScreen";
import AccountScreen from "./screens/AccountScreen";
import { Text } from "react-native";

export type RootStackParamList = {
  Home: undefined;
  Favorites: undefined;
};

export type LoginRootStackParamList = {
  HomeTab: undefined;
  Login: undefined;
  Signup: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator<LoginRootStackParamList>();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name === "Favorites") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          }

          return (
            <Ionicons name={iconName as string} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        options={{
          headerTitle: (props) => <AppHeader title="Your Menu" />,
          headerTitleAlign: "center",
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          headerTitle: (props) => <AppHeader title="Favorites" />,
          headerTitleAlign: "center",
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <APOLLOProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginPage}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Signup"
            component={SignupScreen}
          />
          <Stack.Screen
            name="HomeTab"
            component={HomeTabs}
            options={{ headerShown: false }}
          />

          <Stack.Screen name="Account" component={AccountScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </APOLLOProvider>
  );
}
