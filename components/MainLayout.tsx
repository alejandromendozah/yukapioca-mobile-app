import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import BottomMenu from "./BottomMenu";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {

  return (
    <View style={styles.container}>

      <View style={styles.content}>
        {children}
      </View>

      <BottomMenu/>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1
  },

  content:{
    flex:1
  }

});