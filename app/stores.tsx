import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";

import Header from "../components/Headers";
import MainLayout from "../components/MainLayout";
import { Colors } from "../constants/colors";
import stores from "../data/stores.json";

const { width, height } = Dimensions.get("window");

export default function Stores() {

  const mapRef = useRef<MapView>(null);
  const markerRefs = useRef<any>({});

  const [userLocation, setUserLocation] = useState<any>(null);

  useEffect(() => {
    requestLocation();
  }, []);

  const requestLocation = async () => {

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      return;
    }

    const location = await Location.getCurrentPositionAsync({});

    setUserLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });

  };

  const openMaps = (lat:number, lng:number) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    Linking.openURL(url);
  };

  const zoomToStore = (id:number, lat:number, lng:number) => {

    mapRef.current?.animateToRegion(
        {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
        },
        500
    );

    setTimeout(() => {
        markerRefs.current[id]?.showCallout();
    }, 600);

    };

  return (

    <MainLayout>

      <View style={{ flex:1 }}>

        <Header title="Sucursales" />

        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 19.4326,
            longitude: -99.1332,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2
          }}
          showsUserLocation={true}
        >

          {stores.map((store) => (

            <Marker
                key={store.id}
                ref={(ref) => {
                    markerRefs.current[store.id] = ref;
                }}
                coordinate={{
                    latitude: store.latitude,
                    longitude: store.longitude
                }}
                pinColor={Colors.primary}
            >

              <Callout
                tooltip
                onPress={() => openMaps(store.latitude, store.longitude)}
              >

                <View style={styles.calloutContainer}>

                  <Text style={styles.calloutTitle}>
                    {store.name}
                  </Text>

                  <Text style={styles.calloutText}>
                    {store.address}
                  </Text>

                  <Text style={styles.calloutText}>
                    Horario: {store.schedule}
                  </Text>

                  {store.phone && (
                    <Text style={styles.calloutText}>
                      Tel: {store.phone}
                    </Text>
                  )}

                  <View style={styles.directionButton}>
                    <Text style={styles.directionText}>
                      Cómo llegar
                    </Text>
                  </View>

                </View>

              </Callout>

            </Marker>

          ))}

        </MapView>

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
                        onPress={() => zoomToStore(item.id, item.latitude, item.longitude)}
                    >
                        <Text style={styles.directionText}>
                        Ver en mapa
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

  map:{
    width:width,
    height:height * 0.4
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

  calloutContainer:{
    width:180,
    padding:10,
    backgroundColor:"#fff",
    borderRadius:10,
    shadowColor:"#000",
    shadowOpacity:0.15,
    shadowRadius:5,
    shadowOffset:{width:0,height:2},
    elevation:4
  },

  calloutTitle:{
    fontWeight:"bold",
    fontSize:16,
    marginBottom:4
  },

  calloutText:{
    fontSize:12,
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