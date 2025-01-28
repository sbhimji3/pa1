import { useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { getName } from '../api/api'

export default function HomeScreen() {
  const [name, setName] = useState('');

  useEffect(() => {
    getName().then(fetchedName => {
      setName(fetchedName); 
    });
  }, []);

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.text}>Welcome, {name || 'Loading...'}!</Text>
    </View>
  );
}



const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#478'
  }
});
