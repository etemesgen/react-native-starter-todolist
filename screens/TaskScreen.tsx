import { useState } from 'react';
import { View, TouchableOpacity, FlatList, Modal, Pressable, Text, TextInput, StyleSheet } from 'react-native';
import Task from '../components/Task';

type Task = {
  id: number;
  title: string;
  description: string;
  date: string;
}

export default function TaskScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const createTask = () => {
    setTasks([...tasks, { id: Math.random(), title: title, description: description, date: date }]);
    setModalVisible(!modalVisible);
  }

  const removeTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Create Task</Text>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>X</Text>
              </Pressable>    
            </View>

            <View style={{marginTop: 20}}>
              <Text>Title</Text>
              <TextInput placeholder="Enter Title" style={styles.modalInput} onChangeText={(text) => setTitle(text)} autoFocus />
            </View>
            <View style={{marginTop: 20}}>
              <Text>Description</Text>
              <TextInput placeholder="Enter Description" style={styles.modalInput} onChangeText={(text) => setDescription(text)} />
            </View>
            <View style={{marginTop: 20}}>
              <Text>Date</Text>
              <TextInput placeholder="Enter Date" style={styles.modalInput} onChangeText={(text) => setDate(text)} />
            </View>

            <TouchableOpacity style={{marginTop: 40, backgroundColor: 'green', padding: 10, borderRadius: 10}} onPress={createTask}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15, textAlign: 'center'}}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <FlatList
        style={{width: '100%', padding: 30}}
        data={tasks}
        renderItem={({item}) => (
          <Pressable onLongPress={() => removeTask(item.id)}>
          <Task title={item.title} description={item.description} date={item.date} />
          </Pressable>
        )}
      />
      
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => {setModalVisible(true)}}
      >
        <Text style={{color: 'white', fontSize: 30, position: 'relative', left: 20, top: 10}}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  createButton: {
    position: 'absolute',
    bottom: 70,
    right: 40,
    backgroundColor: 'limegreen',
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  modalContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    zIndex: 1
  },
  modalBody: {
    backgroundColor: 'white', 
    width: '80%', 
    padding: 20, 
    borderRadius: 10
  },
  modalInput: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    marginTop: 10,
  },
});