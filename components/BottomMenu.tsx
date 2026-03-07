import { Ionicons } from "@expo/vector-icons";
import { Href, router, usePathname } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/colors";
import { useCart } from "../context/CartContext";

export default function BottomMenu() {

  const pathname = usePathname();
  const { cart } = useCart();

  const navigate = (route: Href) => {
    if (pathname !== route) {
        router.push(route);
    }
   };

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigate("/home")}
      >
        <Ionicons
          name="home"
          size={24}
          color={pathname === "/home" ? Colors.primary : "#9aa0a6"}
        />
        <Text
          style={pathname === "/home" ? styles.active : styles.text}
        >
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigate("/stores")}
      >
        <Ionicons
          name="location-outline"
          size={24}
          color={pathname === "/stores" ? Colors.primary : "#9aa0a6"}
        />
        <Text
          style={pathname === "/stores" ? styles.active : styles.text}
        >
          Mapa
        </Text>
      </TouchableOpacity>



      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigate("/cart")}
      >

        <Ionicons name="cart" size={26} color="#fff"/>

        {cart.length > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cart.length}</Text>
          </View>
        )}

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigate("/shop")}
      >
        <Ionicons
          name="storefront-outline"
          size={24}
          color={pathname === "/shop" ? Colors.primary : "#9aa0a6"}
        />
        <Text
          style={pathname === "/shop" ? styles.active : styles.text}
        >
          Tienda
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigate("/profile")}
      >
        <Ionicons
          name="person-outline"
          size={24}
          color={pathname === "/profile" ? Colors.primary : "#9aa0a6"}
        />
        <Text
          style={pathname === "/profile" ? styles.active : styles.text}
        >
          Perfil
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    backgroundColor:"#fff",
    paddingVertical:18,
    borderTopWidth:1,
    borderColor:"#eee"
  },

  item:{
    alignItems:"center"
  },

  text:{
    fontSize:12,
    color:"#9aa0a6"
  },

  active:{
    fontSize:12,
    color:Colors.primary,
    fontWeight:"600"
  },

  cartButton:{
    width:60,
    height:60,
    borderRadius:30,
    backgroundColor:Colors.primary,
    justifyContent:"center",
    alignItems:"center",
    marginTop:-30,
    shadowColor:"#000",
    shadowOpacity:0.2,
    shadowRadius:8,
    shadowOffset:{width:0,height:4},
    elevation:6
  },

  badge:{
    position:"absolute",
    top:6,
    right:10,
    backgroundColor:"red",
    borderRadius:10,
    paddingHorizontal:5,
    paddingVertical:1
  },

  badgeText:{
    color:"#fff",
    fontSize:10,
    fontWeight:"bold"
  }

});