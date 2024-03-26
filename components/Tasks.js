import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import EditTaskModal from "./EditTaskModal";

export default function Tasks({ tasks, setTasks }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const toggleDone = async (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  useEffect(() => {
    const getTasks = async () => {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks) {
        const parsedStoredTasks = JSON.parse(storedTasks);
        const past24Hours = new Date().getTime() + 24 * 60 * 60 * 1000;
        const tasksToKeep = parsedStoredTasks.filter(
          (task) => task.daily || task.timestamp >= past24Hours
        );

        await AsyncStorage.setItem("tasks", JSON.stringify(tasksToKeep));
        
        setTasks([...tasksToKeep]);
      }
    };

    getTasks();
  }, []);

  const openModal = (task) => {
    setIsModalOpen(true);
    setSelectedTask(task);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
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
                      height: 40,
                    }}
                    onPress={() => {
                      toggleDone(index);
                    }}
                  >
                    <AntDesign name="check" size={24} color="gray" />
                    <Text style={[styles.doneTaskText, { width: 200 }]}>
                      {item.task}
                    </Text>
                  </Pressable>

                  <Pressable
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() => openModal(item, index)}
                  >
                    {item.daily && (
                      <Text
                        style={{
                          fontSize: 20,
                          backgroundColor: "#09f",
                          paddingHorizontal: 6,
                          paddingVertical: 2,
                          borderRadius: 8,
                        }}
                      >
                        Daily
                      </Text>
                    )}
                    <Text style={{ padding: 6 }}>
                      <Entypo
                        name="dots-three-vertical"
                        size={22}
                        color="gray"
                      />
                    </Text>
                  </Pressable>
                </View>
              ) : (
                <View style={styles.task}>
                  <Pressable
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                      height: 40,
                    }}
                    onPress={() => toggleDone(index)}
                  >
                    <Entypo name="circle" size={24} color="black" />
                    <Text style={{ fontSize: 24, width: 200 }}>
                      {item.task}
                    </Text>
                  </Pressable>

                  <Pressable
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() => openModal(item, index)}
                  >
                    {item.daily && (
                      <Text
                        style={{
                          fontSize: 20,
                          backgroundColor: "#09f",
                          paddingHorizontal: 6,
                          paddingVertical: 2,
                          borderRadius: 8,
                        }}
                      >
                        Daily
                      </Text>
                    )}
                    <Text style={{ padding: 6 }}>
                      <Entypo
                        name="dots-three-vertical"
                        size={22}
                        color="gray"
                      />
                    </Text>
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
