import React, { useRef, useState } from "react";
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
import { Feather } from "@expo/vector-icons";

export default function NewTaskModal({ isOpen, toggleModal, setTasks, tasks }) {
  const [input, setInput] = useState("");
  const [daily, setDaily] = useState(false);

  const saveNewTask = async () => {
    if (input === "") return toggleModal();

    const newTask = {
      task: input,
      done: false,
      daily: daily,
      timestamp: Date.now(),
    };

    setTasks([...tasks, newTask]);
    await AsyncStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));

    setInput("");
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
          <View style={{ backgroundColor: "white", borderRadius: 10 }}>
            <Text>New Task</Text>
            <TextInput
              style={{ fontSize: 22 }}
              placeholder="Your task..."
              onChangeText={(newInput) => setInput(newInput)}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: 6,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  height: 36,
                  alignItems: "center",
                }}
              >
                <Pressable
                  style={[
                    styles.btn,
                    daily === false && {
                      backgroundColor: "#09f",
                      color: "#fff",
                    },
                  ]}
                  onPress={() => {
                    setDaily(false);
                  }}
                >
                  <Text>Today</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.btn,
                    daily === true && {
                      backgroundColor: "#09f",
                      color: "#fff",
                    },
                  ]}
                  onPress={() => {
                    setDaily(true);
                  }}
                >
                  <Text>Daily</Text>
                </Pressable>
              </View>
              <Pressable
                onPress={saveNewTask}
                style={[styles.btn, { backgroundColor: "black" }]}
              >
                <Text style={{ color: "white", fontSize: 25 }}>Save</Text>
              </Pressable>
            </View>
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
