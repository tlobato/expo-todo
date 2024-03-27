import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Header from "../components/Header";
import Tasks from "../components/Tasks";
import { useState } from "react";
import NewTaskButton from "../components/NewTaskButton";
import NewTaskModal from "../components/NewTaskModal";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([
    { task: "walk dog", done: true, daily: false, timestamp: Date.now()},
  ]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <View style={styles.container}>
      <Header setTasks={setTasks}/>
      <Tasks tasks={tasks} setTasks={setTasks} />
      {/* new task button */}
      {isModalOpen === false && <NewTaskButton onModalOpen={toggleModal} />}
      <NewTaskModal isOpen={isModalOpen} toggleModal={toggleModal} setTasks={setTasks} tasks={tasks}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "column",
  },
});
