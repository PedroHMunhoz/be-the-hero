import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Incidents from "./pages/Incidents";
import Details from "./pages/Details";

const AppStack = createStackNavigator();

export default function Routs() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen
          name="Incidents"
          component={Incidents}
        ></AppStack.Screen>
        <AppStack.Screen name="Detail" component={Details}></AppStack.Screen>
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
