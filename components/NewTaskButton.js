import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function NewTaskButton({onModalOpen}) {
  return (
    <View style={{position: "absolute", bottom: 10, right: 10}}>
      <Pressable
        onPress={onModalOpen}
        style={styles.NewTaskButton}
      >
        <AntDesign name="pluscircleo" size={24} color="white" />
        <Text style={{ color: "white", fontSize: 20 }}>New Task</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  NewTaskButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "black",
    padding: 10,
    justifyContent: "center",
    borderRadius: 10,
    marginRight: 8
  },
});
