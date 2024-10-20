import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

type TaskProps = {
  title: string;
  description: string;
  date: string;
}

export default function Task(props: TaskProps) {
  const { title, description, date } = props;
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.taskContainer}>
      <View style={styles.taskHeader}>
        <View>
          <Text style={{fontSize: 20}}>{title}</Text>
        </View>
        <View>
          <BouncyCheckbox 
            size={25}
            fillColor="limegreen"
            unFillColor="#f5f5f5"
            text="Task Action"
            iconStyle={{ position: 'relative', left: 15 }}
            innerIconStyle={{ borderWidth: 1.5, borderColor: isChecked ? 'limegreen' : 'gray' }}
            onPress={(isChecked: boolean) => {
              setIsChecked(isChecked);
            }}
          />
        </View>
      </View>
      <Text style={{marginTop: 10}}>{description}</Text>

      <View style={styles.taskFooter}>
        <View style={{backgroundColor: isChecked ? 'limegreen' : 'gray', padding: 5, borderRadius: 7}}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>{ isChecked ? 'Done' : 'Not Done'}</Text>
        </View>
        <Text style={{textAlign: 'right', marginTop: 10}}>{date}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  taskContainer: {
    marginTop: 30, 
    backgroundColor: '#f5f5f5', 
    padding: 15, 
    borderRadius: 10, 
    borderColor: 'lightgray', 
    borderWidth: 1
  },
  taskHeader: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  taskFooter: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10, 
    alignItems: 'baseline'
  }
})