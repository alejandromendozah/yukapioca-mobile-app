import { useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import Toast from "react-native-toast-message";

import Header from "../../components/Headers";
import { Colors } from "../../constants/colors";
import { useCart } from "../../context/CartContext";

import products from "../../data/products.json";
import { productImages } from "../../utils/productImages";

export default function ProductDetail(){

  const { id } = useLocalSearchParams();
  const { addToCart } = useCart();

  const scale = useRef(new Animated.Value(1)).current;

  const product = products.find((p:any) => p.id === Number(id));

  if(!product) return null;

  const handleAdd = () => {

    Animated.sequence([
      Animated.timing(scale,{
        toValue:0.9,
        duration:100,
        useNativeDriver:true
      }),
      Animated.timing(scale,{
        toValue:1,
        duration:100,
        useNativeDriver:true
      })
    ]).start();

    addToCart(product);

    Toast.show({
      type:"success",
      text1:"Producto agregado",
      text2:product.name,
      position:"bottom",
      bottomOffset:40
    });

  };

  return (

    <View style={{ flex:1 }}>

      <Header title="Producto" />

      <View style={styles.container}>

        <Image
          source={productImages[product.image]}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.name}>
          {product.name}
        </Text>

        <Text style={styles.price}>
          ${product.price}
        </Text>

        <Text style={styles.description}>
          {product.description}
        </Text>

        <Animated.View style={{ transform:[{ scale }] }}>

          <TouchableOpacity
            style={styles.button}
            onPress={handleAdd}
          >
            <Text style={styles.buttonText}>
              Agregar al carrito
            </Text>
          </TouchableOpacity>

        </Animated.View>

      </View>

    </View>

  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:20,
    alignItems:"center",
    backgroundColor:"#fff"
  },

  image:{
    width:200,
    height:200,
    marginBottom:20
  },

  name:{
    fontSize:22,
    fontWeight:"bold"
  },

  price:{
    fontSize:18,
    color:Colors.primary,
    marginVertical:10
  },

  description:{
    textAlign:"center",
    marginBottom:20
  },

  button:{
    backgroundColor:Colors.primary,
    padding:14,
    borderRadius:10,
    width:"80%",
    alignItems:"center"
  },

  buttonText:{
    color:"#fff",
    fontWeight:"bold"
  }

});