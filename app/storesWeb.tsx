import {
  Dimensions,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import Header from "../components/Headers";
import MainLayout from "../components/MainLayout";
import { Colors } from "../constants/colors";
import stores from "../data/stores.json";

const { width } = Dimensions.get("window");

export default function Stores() {

  const openMaps = (lat:number, lng:number) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    Linking.openURL(url);
  };

  return (
    <MainLayout>

      <View style={{ flex:1 }}>

        <Header title="Sucursales" />

        {/* MAPA WEB */}

        <View style={styles.mapContainer}>

          <iframe
            src="https://maps.google.com/maps?q=19.4326,-99.1332&z=10&output=embed"
            width="100%"
            height="100%"
            style={{ border:0 }}
          />

        </View>

        {/* LISTA DE SUCURSALES */}

        <View style={styles.listContainer}>

          <FlatList
            data={stores}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (

              <View style={styles.storeCard}>

                <Text style={styles.storeName}>
                  {item.name}
                </Text>

                <Text style={styles.storeText}>
                  📍 {item.address}
                </Text>

                <Text style={styles.storeText}>
                  ⏰ {item.schedule}
                </Text>

                {item.phone && (
                  <Text style={styles.storeText}>
                    ☎ {item.phone}
                  </Text>
                )}

                <View style={{ alignItems:"center", marginTop:10 }}>

                  <TouchableOpacity
                    style={styles.directionButton}
                    onPress={() => openMaps(item.latitude, item.longitude)}
                  >
                    <Text style={styles.directionText}>
                      Cómo llegar
                    </Text>
                  </TouchableOpacity>

                </View>

              </View>

            )}
          />

        </View>

      </View>

    </MainLayout>
  );
}

const styles = StyleSheet.create({

  mapContainer:{
    width:"100%",
    height:400
  },

  listContainer:{
    flex:1,
    backgroundColor:Colors.background,
    padding:15
  },

  storeCard:{
    backgroundColor:"#fff",
    padding:15,
    borderRadius:12,
    marginBottom:12,
    shadowColor:"#000",
    shadowOpacity:0.08,
    shadowRadius:6,
    shadowOffset:{width:0,height:3},
    elevation:3
  },

  storeName:{
    fontSize:16,
    fontWeight:"bold",
    marginBottom:5
  },

  storeText:{
    color:"#555",
    marginBottom:2
  },

  directionButton:{
    backgroundColor:Colors.primary,
    paddingVertical:6,
    paddingHorizontal:10,
    borderRadius:6
  },

  directionText:{
    color:"#fff",
    fontWeight:"bold",
    textAlign:"center"
  }

});