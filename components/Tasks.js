import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import EditTaskModal from "./EditTaskModal";

export default function Tasks({ tasks, setTasks }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const toggleDone = async (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  };

  useEffect(() => {
    const getTasks = async () => {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    };

    getTasks();
  }, []);

  const openModal = (task, index) => {
    setIsModalOpen(true);
    setSelectedTask(task);
    setSelectedIndex(index)
  };

  const closeModal = (index) => {
    setIsModalOpen(false);
    setSelectedTask(null);
    setSelectedIndex(null)
  };

  return (
    <View style={{ paddingTop: 105, paddingBottom: 60 }}>
      <FlatList
        style={{ paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={true}
        data={tasks}
        contentContainerStyle={[styles.listContainer]}
        renderItem={({ item, index }) => {
          return (
            <View>
              {item.done ? (
                <View style={styles.task}>
                  <Pressable
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                    onPress={() => {
                      toggleDone(index);
                    }}
                  >
                    <AntDesign name="check" size={24} color="gray" />
                    <Text style={[styles.doneTaskText, {width: 250}]}>{item.task}</Text>
                  </Pressable>

                  <Pressable style={{padding:6}} onPress={() => openModal(item, index)}>
                    <Entypo name="dots-three-vertical" size={22} color="gray" />
                  </Pressable>
                </View>
              ) : (
                <View style={styles.task}>
                  <Pressable
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                    onPress={() => toggleDone(index)}
                  >
                    <Entypo name="circle" size={24} color="black" />
                    <Text style={{ fontSize: 24, width: 250 }}>{item.task}</Text>
                  </Pressable>

                  <Pressable style={{padding:6, flexDirection: 'row', justifyContent:'center'}} onPress={() => openModal(item, index)}>
                    <Entypo
                      name="dots-three-vertical"
                      size={22}
                      color="black"
                    />
                  </Pressable>
                </View>
              )}
            </View>
          );
        }}
      />
      <EditTaskModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        setTasks={setTasks}
        tasks={tasks}
        selectedTask={selectedTask}
        selectedIndex={selectedIndex}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  task: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    justifyContent: "space-between",
  },
  doneTaskText: {
    fontSize: 24,
    textDecorationLine: "line-through",
    color: "gray",
  },
});