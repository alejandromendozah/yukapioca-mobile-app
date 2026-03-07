import { StyleSheet, Text, View } from "react-native";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        {title}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    alignItems:"center",
    paddingHorizontal:20,
    paddingTop:80,
    paddingBottom:40,
    backgroundColor:"#fff"
  },

  title:{
    fontSize:20,
    fontWeight:"bold"
  }

});