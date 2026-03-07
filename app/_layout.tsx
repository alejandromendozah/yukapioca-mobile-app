import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { CartProvider } from "../context/CartContext";

export default function RootLayout() {

  return (
    <CartProvider>

      <Stack
        screenOptions={{
          headerShown:false
        }}
      >

        <Stack.Screen name="index"/>
        <Stack.Screen name="home"/>
        <Stack.Screen name="portal"/>
        <Stack.Screen name="stores"/>
        <Stack.Screen name="shop"/>
        <Stack.Screen name="cart"/>
        <Stack.Screen name="profile"/>
        <Stack.Screen name="product/[id]"/>

      </Stack>

      <StatusBar style="auto" />
      <Toast />

    </CartProvider>
  );
}