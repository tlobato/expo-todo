import React, { useEffect, useState } from "react";
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

export default function NewTaskModal({
  isOpen,
  closeModal,
  setTasks,
  tasks,
  selectedTask,
  selectedIndex
}) {
  const [input, setInput] = useState("");

  useEffect(() => {
    if (selectedTask) setInput(selectedTask.task);
  }, [selectedTask]);

  const saveTask = async () => {
    if (input === selectedTask.task || input === '') return closeModal();

    const updatedTasks = [...tasks];
    updatedTasks[selectedIndex].task = input;
    setTasks(updatedTasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(tasks));

    closeModal();
  };

  const deleteTask = async () => {
    const newTasks = tasks.filter(
      (task) => task.timestamp !== selectedTask.timestamp
    );
    setTasks(newTasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    closeModal();
  };

  if (selectedTask)
    return (
      <Modal
        visible={isOpen}
        transparent={true}
        animationType="slide"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <TouchableWithoutFeedback>
          <View style={[styles.modal]}>
            <Pressable style={{ alignSelf: "flex-end" }} onPress={closeModal}>
              <Feather name="x" size={20} color="black" />
            </Pressable>
            <View style={{ backgroundColor: "white", borderRadius: 10 }}>
              <Text>Edit {selectedTask.task}</Text>
              <TextInput
                style={{ fontSize: 22 }}
                placeholder="Task name..."
                onChangeText={(newInput) => setInput(newInput)}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: 12,
                  paddingVertical: 10,
                }}
              >
                <Pressable onPress={deleteTask}>
                  <Text style={[styles.btn, { backgroundColor: "red" }]}>
                    Delete Task
                  </Text>
                </Pressable>
                <Pressable onPress={saveTask}>
                  <Text style={[styles.btn, { backgroundColor: "black" }]}>
                    Save
                  </Text>
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
    paddingVertical: 10,
    paddingHorizontal: 15,
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
