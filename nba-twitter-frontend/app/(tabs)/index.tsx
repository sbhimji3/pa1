import { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import { postName } from '../api/api'

export default function HomeScreen() {
  const [text, onChangeText] = useState('Enter name');
  const [responseMessage, setResponseMessage] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('Welcome!');

  async function handleSubmit() {
    console.log('Button pressed');
    alert(`Hello, ${text}`);
    const response = await postName(text);
    if (response) {
      setResponseMessage(`${response.name}: ${response.visits} total visits`);
      setWelcomeMessage(``);
    } else {
      setResponseMessage('Error fetching data');
    }
  }

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.text2}>{responseMessage}</Text>
      <Text style={styles.text}>{welcomeMessage}</Text>
      <TextInput 
        style={styles.input} 
        onChangeText={onChangeText} 
        value={text} 
        placeholder="Enter name" 
        placeholderTextColor="#888" 
      />
      <Button 
        title="Submit" 
        onPress={handleSubmit} 
      />
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
  text: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#478'
  },
  text2: {
    fontSize: 36,
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
    width: '70%',
  }
});
