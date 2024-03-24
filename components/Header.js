import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  const today = new Date()
  return <View style={styles.header}>
    <Text style={{color: "white", fontSize: 20}}>{today.getMonth() + 1}/{today.getDate()}/{today.getFullYear()}</Text>
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
  }
})