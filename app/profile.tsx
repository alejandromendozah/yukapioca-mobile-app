import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../components/Headers";
import MainLayout from "../components/MainLayout";
import { Colors } from "../constants/colors";
import { useCart } from "../context/CartContext";

export default function Profile(){

  const { cart } = useCart();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadSession();
  }, []);

  const loadSession = async () => {
    const session = await AsyncStorage.getItem("session");

    if(session){
      setUser(JSON.parse(session));
    }
  };

  const confirmLogout = () => {

    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        {
          text:"Cancelar",
          style:"cancel"
        },
        {
          text:"Cerrar sesión",
          style:"destructive",
          onPress: logout
        }
      ]
    );

  };

  const logout = async () => {

    await AsyncStorage.removeItem("session");

    router.replace("/");

  };

  return(

    <MainLayout>

      <View style={styles.container}>

        <Header title="Perfil" />

        <View style={styles.profileCard}>

          <View style={styles.avatar}>
            <Ionicons name="person" size={50} color={Colors.primary} />
          </View>

          <Text style={styles.name}>
            {user ? user.name : "Usuario"}
          </Text>

          <Text style={styles.email}>
            {user ? user.email : ""}
          </Text>

        </View>

        <View style={styles.statsContainer}>

          <View style={styles.stat}>
            <Text style={styles.statNumber}>{cart.length}</Text>
            <Text style={styles.statLabel}>Carrito</Text>
          </View>

          <View style={styles.stat}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Pedidos</Text>
          </View>

          <View style={styles.stat}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Favoritos</Text>
          </View>

        </View>


        <View style={styles.menu}>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="receipt-outline" size={22} color="#000" />
            <Text style={styles.menuText}>Mis pedidos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="location-outline" size={22} color="#000" />
            <Text style={styles.menuText}>Dirección</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={confirmLogout}
          >
            <Ionicons name="log-out-outline" size={22} color="#000" />
            <Text style={styles.menuText}>Cerrar sesión</Text>
          </TouchableOpacity>

        </View>

      </View>

    </MainLayout>

  );

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:Colors.background,
    padding:20
  },

  profileCard:{
    alignItems:"center",
    backgroundColor:"#fff",
    padding:25,
    borderRadius:15,
    marginTop:20,

    shadowColor:"#000",
    shadowOpacity:0.1,
    shadowRadius:10,
    shadowOffset:{ width:0, height:3 },
    elevation:3
  },

  avatar:{
    width:90,
    height:90,
    borderRadius:45,
    backgroundColor:"#f3f3f3",
    justifyContent:"center",
    alignItems:"center",
    marginBottom:15
  },

  name:{
    fontSize:20,
    fontWeight:"bold"
  },

  email:{
    color:"gray",
    marginTop:4
  },

  statsContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:20,
    backgroundColor:"#fff",
    padding:20,
    borderRadius:15,

    shadowColor:"#000",
    shadowOpacity:0.08,
    shadowRadius:8,
    shadowOffset:{ width:0, height:3 },
    elevation:2
  },

  stat:{
    alignItems:"center",
    flex:1
  },

  statNumber:{
    fontSize:20,
    fontWeight:"bold",
    color:Colors.primary
  },

  statLabel:{
    fontSize:13,
    color:"gray",
    marginTop:3
  },

  menu:{
    marginTop:25
  },

  menuItem:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#fff",
    padding:16,
    borderRadius:12,
    marginBottom:12,

    shadowColor:"#000",
    shadowOpacity:0.05,
    shadowRadius:6,
    shadowOffset:{ width:0, height:3 },
    elevation:2
  },

  menuText:{
    fontSize:16,
    marginLeft:12
  }

});