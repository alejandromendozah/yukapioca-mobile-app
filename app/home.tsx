import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import MainLayout from "../components/MainLayout";
import { Colors } from "../constants/colors";

export default function Home() {

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

  return (

    <MainLayout>

      <View style={styles.container}>

        <LinearGradient
          colors={[Colors.primary, "#9BCB1C"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >

          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#fff" />
          </View>

          <Text style={styles.title}>
            ¡Bienvenido{user ? `, ${user.name}` : ""}!
          </Text>

          <Text style={styles.email}>
            {user ? user.email : ""}
          </Text>

        </LinearGradient>


        <View style={styles.content}>

          <Text style={styles.section}>Acciones rápidas</Text>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/portal")}
          >
            <View style={styles.row}>
              <Ionicons name="globe-outline" size={22} color={Colors.primary} />
              <Text style={styles.cardText}>Portal Web</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#9aa0a6" />
          </TouchableOpacity>


          <Text style={styles.section}>Explorar</Text>

          <View style={styles.grid}>

            <TouchableOpacity
              style={styles.cardSmall}
              onPress={() => router.push("/stores")}
            >
              <Ionicons name="location-outline" size={26} color={Colors.primary} />
              <Text style={styles.smallText}>Sucursales</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cardSmall}
              onPress={() => router.push("/shop")}
            >
              <Ionicons name="cart-outline" size={26} color={Colors.primary} />
              <Text style={styles.smallText}>Tienda</Text>
            </TouchableOpacity>

          </View>


          <Text style={styles.section}>Cuenta</Text>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/profile")}
          >
            <View style={styles.row}>
              <Ionicons name="person-outline" size={22} color={Colors.primary} />
              <Text style={styles.cardText}>Perfil</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#9aa0a6" />
          </TouchableOpacity>


          <Text style={styles.section}>Accesos recientes</Text>

          <View style={styles.grid}>

            <TouchableOpacity style={styles.cardSmall}>
              <Ionicons name="bag-outline" size={24} color={Colors.primary} />
              <Text style={styles.smallText}>Última compra</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cardSmall}>
              <Ionicons name="location-outline" size={24} color={Colors.primary} />
              <Text style={styles.smallText}>Sucursal cercana</Text>
            </TouchableOpacity>

          </View>

        </View>

      </View>

    </MainLayout>

  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#f2f4f7"
  },

  header:{
    paddingTop:70,
    paddingBottom:40,
    alignItems:"center",
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30
  },

  avatar:{
    width:80,
    height:80,
    borderRadius:40,
    backgroundColor:"rgba(255,255,255,0.25)",
    justifyContent:"center",
    alignItems:"center",
    borderWidth:3,
    borderColor:"#fff",
    marginBottom:10
  },

  title:{
    fontSize:26,
    fontWeight:"bold",
    color:"#fff"
  },

  email:{
    color:"#eaf7c8",
    marginTop:5
  },

  content:{
    padding:20,
    flex:1
  },

  section:{
    fontSize:16,
    color:"#7b8794",
    marginBottom:10,
    marginTop:10,
    fontWeight:"600"
  },

  card:{
    backgroundColor:"#fff",
    borderRadius:16,
    padding:18,
    marginBottom:14,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    shadowColor:"#000",
    shadowOpacity:0.08,
    shadowRadius:10,
    shadowOffset:{width:0,height:4},
    elevation:4
  },

  row:{
    flexDirection:"row",
    alignItems:"center"
  },

  cardText:{
    marginLeft:10,
    fontSize:16,
    fontWeight:"600",
    color:"#333"
  },

  grid:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:10
  },

  cardSmall:{
    width:"48%",
    backgroundColor:"#fff",
    borderRadius:16,
    padding:20,
    alignItems:"center",
    shadowColor:"#000",
    shadowOpacity:0.08,
    shadowRadius:10,
    shadowOffset:{width:0,height:4},
    elevation:4
  },

  smallText:{
    marginTop:6,
    fontWeight:"600",
    color:"#4a4a4a"
  }

});