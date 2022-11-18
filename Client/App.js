import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
<<<<<<< HEAD
import ImagePickerExample from './ImagePickerExample';
=======
import ImagePickerExample from './ImagePicker';
>>>>>>> 094ae6390f6729785d6817511835eef1c8d3a3c3

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
<<<<<<< HEAD
=======
      <Text></Text>
      <ImagePickerExample />
>>>>>>> 094ae6390f6729785d6817511835eef1c8d3a3c3
      <StatusBar style="auto" />
      <ImagePickerExample />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
