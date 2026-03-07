import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import Header from "../components/Headers";
import MainLayout from "../components/MainLayout";

import { Colors } from "../constants/colors";
import { useCart } from "../context/CartContext";
import { productImages } from "../utils/productImages";

export default function Cart(){

  const { cart, removeFromCart, clearCart } = useCart();

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const total = cart.reduce((sum: number, item: any) => sum + item.price, 0);

  const handleRemove = (index:number) => {

    Animated.timing(fadeAnim,{
      toValue:0,
      duration:200,
      useNativeDriver:true
    }).start(() => {

      removeFromCart(index);

      fadeAnim.setValue(1);

    });

  };

  return (

    <MainLayout>

      <View style={styles.container}>

        <Header title="Carrito" />

        <View style={styles.header}>

          <Text style={styles.title}></Text>

          {cart.length > 0 && (

            <TouchableOpacity onPress={clearCart}>
              <Text style={styles.clearText}>
                Vaciar
              </Text>
            </TouchableOpacity>

          )}

        </View>


        <FlatList
          data={cart}
          keyExtractor={(item,index)=>index.toString()}

          ListEmptyComponent={() => (

            <View style={styles.emptyContainer}>

              <Ionicons
                name="cart-outline"
                size={90}
                color="#d1d5db"
              />

              <Text style={styles.emptyText}>
                ¡Ouch!, aún no has agregado ningún producto al carrito
              </Text>

            </View>

          )}

          renderItem={({ item, index }) => (

            <Animated.View style={{ opacity: fadeAnim }}>

              <View style={styles.item}>

                <Image
                  source={productImages[item.image]}
                  style={styles.image}
                />

                <View style={{ flex:1 }}>

                  <Text style={styles.name}>
                    {item.name}
                  </Text>

                  <Text style={styles.price}>
                    ${item.price}
                  </Text>

                </View>

                <TouchableOpacity
                  onPress={() => handleRemove(index)}
                >

                  <Ionicons
                    name="trash-outline"
                    size={22}
                    color="#ff4d4d"
                  />

                </TouchableOpacity>

              </View>

            </Animated.View>

          )}
        />


        {cart.length > 0 && (

          <View style={styles.checkoutContainer}>

            <Text style={styles.total}>
              Total: ${total}
            </Text>

            <TouchableOpacity style={styles.checkoutButton}>

              <Text style={styles.checkoutText}>
                Checkout
              </Text>

            </TouchableOpacity>

          </View>

        )}

      </View>

    </MainLayout>

  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:20,
    backgroundColor:"#fff"
  },

  header:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:20
  },

  title:{
    fontSize:26
  },

  clearText:{
    color:"#ff4d4d",
    fontWeight:"bold"
  },

  item:{
    flexDirection:"row",
    alignItems:"center",
    marginBottom:15
  },

  image:{
    width:60,
    height:60,
    marginRight:15
  },

  name:{
    fontWeight:"bold"
  },

  price:{
    color:Colors.primary
  },

  checkoutContainer:{
    marginTop:20,
    borderTopWidth:1,
    borderColor:"#eee",
    paddingTop:20
  },

  total:{
    fontSize:20,
    fontWeight:"bold",
    marginBottom:15,
    textAlign:"center"
  },

  checkoutButton:{
    backgroundColor:Colors.primary,
    padding:16,
    borderRadius:10,
    alignItems:"center"
  },

  checkoutText:{
    color:"#fff",
    fontSize:18,
    fontWeight:"bold"
  },

  emptyContainer:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    marginTop:100
  },

  emptyText:{
    marginTop:20,
    fontSize:16,
    color:"#6b7280",
    textAlign:"center",
    paddingHorizontal:40
  }

});