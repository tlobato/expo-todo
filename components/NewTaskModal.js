import React, { useState } from "react";
import {
  Modal,
  Pressable,
  TextInput,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Feather} from '@expo/vector-icons'

export default function NewTaskModal({ isOpen, toggleModal, setTasks, tasks }) {
  const [input, setInput] = useState("");

  const saveNewTask = async () => {
    if (input === "") return toggleModal();

    const newTask = {
      task: input,
      done: false,
      daily: false,
      timestamp: Date.now(),
    };

    setTasks([...tasks, newTask]);
    await AsyncStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));

    toggleModal();
  };

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="slide"
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <TouchableWithoutFeedback>
        <View style={styles.modal}>
          <Pressable style={{ alignSelf: "flex-end" }} onPress={toggleModal}>
            <Feather name="x" size={20} color="black" />
          </Pressable>
          <View
            style={{ backgroundColor: "white", borderRadius: 10 }}
          >
            <Text>New Task</Text>
            <TextInput
              style={{ fontSize: 22 }}
              placeholder="Your task..."
              onChangeText={(newInput) => setInput(newInput)}
            />
            <Pressable
              onPress={() => {
                /* Add logic to handle task submission */
              }}
              style={[styles.btn, {backgroundColor: 'black'}]}
            >
              <Text
                style={{ color: "white", fontSize: 25 }}
                onPress={saveNewTask}
              >
                Save
              </Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: 325,
    backgroundColor: "white",
    position: "absolute",
    bottom: -4,
    left: 16,
    borderWidth: 1,
    borderColor: "black",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    gap: 4,
    padding: 15,
  },
  btn: {
    fontSize: 23,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignSelf: "flex-end",
    color: "white",
  },
});
