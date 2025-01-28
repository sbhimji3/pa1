import { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button } from 'react-native';
import { getName } from '../api/api'

export default function HomeScreen() {
  const [name, setName] = useState('');

  useEffect(() => {
    getName().then(fetchedName => {
      setName(fetchedName); 
    });
  }, []);
  const [text, onChangeText] = useState('Enter name');

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.text}>Welcome!</Text>
      <TextInput style={styles.input} onChangeText = {onChangeText} value={text}></TextInput>
      <Button title="Submit"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  text: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#478'
  }, 
  input: {
    color: '#478',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    marginTop: 100,
    marginBottom: 0,
    paddingLeft: 10,
    width: '70%',  // Ensure it's wide enough
  }
});
