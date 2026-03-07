import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import Header from "../components/Headers";
import MainLayout from "../components/MainLayout";
import { Colors } from "../constants/colors";
import products from "../data/products.json";
import { productImages } from "../utils/productImages";

function ProductCard({ item }: any){

  const scale = useRef(new Animated.Value(1)).current;

  const goToDetail = () => {

    Animated.sequence([
      Animated.timing(scale,{
        toValue:0.95,
        duration:100,
        useNativeDriver:true
      }),
      Animated.timing(scale,{
        toValue:1,
        duration:100,
        useNativeDriver:true
      })
    ]).start(() => {

      router.push({
        pathname:"/product/[id]",
        params:{ id:item.id }
      });

    });

  };

  return (

    <Animated.View
      style={{
        transform:[{ scale }],
        width:"48%",
        marginBottom:15
      }}
    >

      <View style={styles.card}>

        <View style={styles.topContent}>

          <Image
            source={productImages[item.image]}
            style={styles.image}
          />

          <Text style={styles.name} numberOfLines={2}>
            {item.name}
          </Text>

          <Text style={styles.price}>
            ${item.price}
          </Text>

          {item.badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {item.badge}
              </Text>
            </View>
          )}

        </View>

        <TouchableOpacity
          style={styles.detailButton}
          onPress={goToDetail}
        >
          <Text style={styles.detailText}>
            Ver detalle
          </Text>
        </TouchableOpacity>

      </View>

    </Animated.View>

  );

}

export default function Shop() {

  const [search,setSearch] = useState("");

  const filteredProducts = products.filter((product:any)=>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <MainLayout>

      <View style={styles.container}>

        <Header title="Tienda" />

        <TextInput
          placeholder="Buscar productos..."
          placeholderTextColor="#888"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />

        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => <ProductCard item={item} />}
          keyExtractor={(item)=>item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent:"space-between"
          }}
          contentContainerStyle={{
            paddingTop:10,
            paddingBottom:20
          }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No se encontraron productos
            </Text>
          }
        />

      </View>

    </MainLayout>

  );

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    paddingHorizontal:20,
    backgroundColor:Colors.background
  },

  searchInput:{
    backgroundColor:"#fff",
    padding:12,
    borderRadius:10,
    marginTop:10,
    marginBottom:10,
    borderWidth:1,
    borderColor:"#9bc31e"
  },

  emptyText:{
    textAlign:"center",
    marginTop:40,
    color:"#888"
  },

  card:{
    backgroundColor:"#fff",
    borderRadius:14,
    padding:14,
    height:240,
    justifyContent:"space-between",
    alignItems:"center",

    shadowColor:"#000",
    shadowOpacity:0.12,
    shadowRadius:10,
    shadowOffset:{ width:0, height:3 },
    elevation:3
  },

  topContent:{
    alignItems:"center"
  },

  image:{
    width:90,
    height:90,
    resizeMode:"contain",
    marginBottom:10
  },

  name:{
    fontSize:15,
    fontWeight:"600",
    textAlign:"center"
  },

  price:{
    color:Colors.primary,
    fontSize:15,
    marginTop:4,
    fontWeight:"bold"
  },

  badge:{
    backgroundColor:"#ff4d4d",
    paddingHorizontal:10,
    paddingVertical:4,
    borderRadius:6,
    marginTop:6
  },

  badgeText:{
    color:"#fff",
    fontSize:12,
    fontWeight:"bold"
  },

  detailButton:{
    backgroundColor:Colors.primary,
    paddingVertical:7,
    paddingHorizontal:16,
    borderRadius:8
  },

  detailText:{
    color:"#fff",
    fontSize:13,
    fontWeight:"600"
  }

});