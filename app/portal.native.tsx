import { useState } from "react";
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { WebView } from "react-native-webview";

import Header from "../components/Headers";
import MainLayout from "../components/MainLayout";
import { Colors } from "../constants/colors";

export default function Portal() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const url = "https://yukapioca.com";

  const openExternalBrowser = () => {
    Linking.openURL(url);
  };

  const reloadPage = () => {
    setError(false);
    setLoading(true);
  };

  return (

    <MainLayout>

      <View style={styles.container}>

        <Header title="Página Web" />

        {/* BOTÓN ABRIR EN NAVEGADOR */}

        <View style={styles.topActions}>
          <TouchableOpacity onPress={openExternalBrowser}>
            <Text style={styles.externalText}>
              Abrir en navegador
            </Text>
          </TouchableOpacity>
        </View>

        {/* SI HAY ERROR */}

        {error ? (

          <View style={styles.errorContainer}>

            <Text style={styles.errorTitle}>
              Sin conexión a internet
            </Text>

            <Text style={styles.errorText}>
              No se pudo cargar la página.
            </Text>

            <TouchableOpacity
              style={styles.retryButton}
              onPress={reloadPage}
            >
              <Text style={styles.retryText}>
                Reintentar
              </Text>
            </TouchableOpacity>

          </View>

        ) : (

          <>
            {/* LOADER */}

            {loading && (
              <ActivityIndicator
                size="large"
                color={Colors.primary}
                style={styles.loader}
              />
            )}

            {/* WEBVIEW */}

            <WebView
              source={{ uri: url }}
              onLoadEnd={() => setLoading(false)}
              onError={() => setError(true)}
            />
          </>

        )}

      </View>

    </MainLayout>

  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:Colors.background
  },

  loader:{
    position:"absolute",
    top:"50%",
    left:"50%",
    marginLeft:-20,
    marginTop:-20,
    zIndex:10
  },

  topActions:{
    alignItems:"flex-end",
    paddingHorizontal:20,
    paddingBottom:10
  },

  externalText:{
    color:Colors.primary,
    fontWeight:"600"
  },

  errorContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    padding:20
  },

  errorTitle:{
    fontSize:18,
    fontWeight:"bold",
    marginBottom:10
  },

  errorText:{
    color:"#666",
    marginBottom:20,
    textAlign:"center"
  },

  retryButton:{
    backgroundColor:Colors.primary,
    paddingVertical:12,
    paddingHorizontal:25,
    borderRadius:8
  },

  retryText:{
    color:"#fff",
    fontWeight:"bold"
  }

});