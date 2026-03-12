import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Header from "../components/Headers";
import MainLayout from "../components/MainLayout";
import { Colors } from "../constants/colors";

export default function Portal() {

  const openPortal = () => {
    Linking.openURL("https://yukapioca.com");
  };

  return (

    <MainLayout>

      <View style={styles.container}>

        <Header title="Página Web" />

        <View style={styles.center}>

          <Text style={styles.text}>
            El portal se abrirá en una nueva pestaña.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={openPortal}
          >

            <Text style={styles.buttonText}>
              Abrir Portal Web
            </Text>

          </TouchableOpacity>

        </View>

      </View>

    </MainLayout>

  );

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:Colors.background
  },

  center:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    padding:30
  },

  text:{
    marginBottom:20,
    fontSize:16,
    textAlign:"center"
  },

  button:{
    backgroundColor:Colors.primary,
    padding:14,
    borderRadius:10
  },

  buttonText:{
    color:"#fff",
    fontWeight:"bold"
  }

});