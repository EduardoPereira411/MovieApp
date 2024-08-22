import * as React  from "react";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./src/Screens/Home";
import Details from "./src/Screens/Details";
import Rating from "./src/Screens/Rating";
import Favorites from "./src/Screens/Favorites";
import Search from "./src/Screens/Search";
import Login from "./src/Screens/Login";
import { useFonts } from "expo-font";
import MyDrawer from "./src/Screens/Drawer";
import Styles from "./src/Styles/Styles";
import { AuthProvider } from "./src/Context/AuthContext";

const Stack = createStackNavigator();
const Drawer =createDrawerNavigator();

function DrawerRoute(){
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props)=><MyDrawer{...props}/>} >
      <Drawer.Screen name = "Login" component={Login} options={Styles.loginHeaderStyle}/>
      <Drawer.Screen name = "Home" component={Home} options={Styles.mainHeaderStyle}/>
      <Drawer.Screen name = "Search" component={Search} options = {Styles.searchHeader}/>
      <Drawer.Screen name = "Rating" component={Rating} options= {Styles.ratingHeaderStyle}/>
      <Drawer.Screen name = "Favorites" component={Favorites} options= {Styles.favoritesHeaderStyle}/>
    </Drawer.Navigator>
  );
}

function App() {
  const [fontLoaded] =useFonts({
    'rajdhani':require("./assets/fonts/Rajdhani-Medium.ttf")
  });
  

  return(
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
          <Stack.Screen name="HomeStack" component={DrawerRoute} options={ {headerShown:false}} />
          <Stack.Screen name="DetailsScreen" component={Details} options={Styles.detailsHeaderStyle} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
