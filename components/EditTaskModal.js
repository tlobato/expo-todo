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
}) {
  const [input, setInput] = useState("");

  const saveTask = async () => {  
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      const taskToEdit = updatedTasks.find(task => task === selectedTask);
      
      if (taskToEdit) {
        taskToEdit.task = input;
        AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
      }
  
      return updatedTasks;
    });

    const storedTasks = await AsyncStorage.getItem("tasks");
    console.log(storedTasks)

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

  const setDaily = async (isDaily) => {
    const updatedTasks = tasks.map((task) =>
      task === selectedTask ? { ...task, daily: isDaily } : task
    );
  
    setTasks(updatedTasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
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
                  gap: 5,
                  paddingVertical: 10,
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
                      selectedTask.daily === false && {
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
                      selectedTask.daily === true && {
                        backgroundColor: "#09f",
                        color: "#fff",
                      },
                    ]}
                    onPress={(ev) => {
                      setDaily(true);
                    }}
                  >
                    <Text>Daily</Text>
                  </Pressable>
                </View>
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
    paddingHorizontal: 10,
  },
  btn: {
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignSelf: "flex-end",
    color: "white",
  },
});
