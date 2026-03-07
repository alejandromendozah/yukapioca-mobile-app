import { router } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../constants/colors";
import users from "../data/users.json";

const { width, height } = Dimensions.get("window");

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {

    setError("");

    if (!email.includes("@")) {
      setError("Ingresa un email válido");
      return;
    }

    if (!password) {
      setError("Ingresa tu contraseña");
      return;
    }

    setLoading(true);

    const user = users.find(
      (u:any) =>
        u.email.toLowerCase().trim() === email.toLowerCase().trim() &&
        u.password === password.trim()
    );

    if (!user) {
      setLoading(false);
      setError("Credenciales incorrectas");
      return;
    }

    try {

      await AsyncStorage.setItem("session", JSON.stringify(user));

      router.replace("/home");

    } catch (e) {

      setError("Error al iniciar sesión");

    }

    setLoading(false);
  };

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>¡Hola!</Text>
      <Text style={styles.subtitle}>Te extrañamos :/</Text>

      <TextInput
        placeholder="alguien@email.com"
        placeholderTextColor="#888"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="****"
        placeholderTextColor="#888"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error !== "" && (
        <Text style={styles.errorText}>
          {error}
        </Text>
      )}

      <Text style={styles.moreText}>¿Olvidaste la contraseña?</Text>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >

        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>Iniciar sesión</Text>
        )}

      </TouchableOpacity>

      <Text style={styles.moreText2}>
        ¿Eres nuevo? <Text style={styles.registerText}>Registrate</Text>
      </Text>

    </View>

  );
}

const styles = StyleSheet.create({

  container:{
    backgroundColor: Colors.background,
    flex:1,
    justifyContent:"center",
    padding:20
  },

  titulo:{
    fontSize:50,
    marginBottom:20,
    textAlign:"center"
  },

  input:{
    padding:20,
    marginTop:20,
    borderRadius:10,
    backgroundColor:Colors.background,
    marginBottom:2,
    borderWidth:0.5,
    borderColor: Colors.primary,
    paddingVertical:12
  },

  subtitle:{
    fontSize:20,
    marginBottom:20,
    textAlign:"center",
    color: Colors.gray
  },

  moreText:{
    fontSize:15,
    marginBottom:20,
    textAlign:"right",
    padding:20
  },

  moreText2:{
    fontSize:15,
    marginBottom:20,
    textAlign:"center",
    padding:20
  },

  registerText:{
    color: Colors.primary,
    fontWeight:"bold"
  },

  loginButton:{
    backgroundColor: Colors.primary,
    padding:14,
    borderRadius:10,
    alignItems:"center",
    marginTop:10,
    shadowColor:"#000",
    shadowOpacity:0.1,
    shadowRadius:4,
    elevation:2
  },

  loginButtonText:{
    color:"#fff",
    fontWeight:"bold",
    fontSize:16
  },

  errorText:{
    color:"#ff4d4d",
    marginTop:10,
    textAlign:"center"
  }

});