import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Header({setTasks}) {
  const clearTasks = async () => {
    setTasks([])
    await AsyncStorage.setItem("tasks", JSON.stringify([]));
  }

  const today = new Date()
  return <View style={styles.header}>
    <Text style={{color: "white", fontSize: 20}}>{today.getMonth() + 1}/{today.getDate()}/{today.getFullYear()}</Text>
    <Pressable onPress={clearTasks}><Text style={{color: 'white', fontSize: 18}}>Clear Tasks</Text></Pressable>
  </View>;
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#000',
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 16,
    borderRadius: 16,
    width: 325,
    position: "absolute",
    top: 44,
    zIndex: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16
  }
})