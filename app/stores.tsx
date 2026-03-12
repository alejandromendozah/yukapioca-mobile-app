import { Platform } from "react-native";

import StoresMobile from "./storesMobile";
import StoresWeb from "./storesWeb";

export default function Stores() {

  if (Platform.OS === "web") {
    return <StoresWeb />;
  }

  return <StoresMobile />;
}