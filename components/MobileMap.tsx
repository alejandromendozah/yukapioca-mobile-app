import { Text, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { Colors } from "../constants/colors";

export default function MobileMap({
  mapRef,
  markerRefs,
  stores,
  openMaps
}: any) {

  return (

    <MapView
      ref={mapRef}
      style={{ width: "100%", height: "100%" }}
      initialRegion={{
        latitude: 19.4326,
        longitude: -99.1332,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2
      }}
      showsUserLocation
    >

      {stores.map((store:any) => (

        <Marker
          key={store.id}
          ref={(ref:any) => markerRefs.current[store.id] = ref}
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

            <View style={{ width:180, padding:10 }}>

              <Text style={{ fontWeight:"bold" }}>
                {store.name}
              </Text>

              <Text>
                {store.address}
              </Text>

              <Text>
                Horario: {store.schedule}
              </Text>

              {store.phone && (
                <Text>
                  Tel: {store.phone}
                </Text>
              )}

              <Text style={{ color:Colors.primary }}>
                Cómo llegar
              </Text>

            </View>

          </Callout>

        </Marker>

      ))}

    </MapView>

  );

}